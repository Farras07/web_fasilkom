import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { FormEventHandler, useState, useEffect } from "react";
import styles from "../styles/AduanDanAspirasi.module.scss";
import { signIn, signOut } from "next-auth/client";
import { API_URL } from "../constants";
import Head from "next/head";
import { DocumentHead } from "../components/DocumentHead";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import Link from "next/link";
import { Jurusan } from "../constants/types";
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../store/pageVisitSlices'
const AduanDanAspirasi: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const dispatch = useDispatch()
  
  const { session, listJurusan } = props;
  const kodeJurusanFromNpm = session?.user?.email?.slice(2, 5) ?? "";
  const selectedJurusanFromKode =
  kodeJurusanFromNpm === "081"
  ? "1"
  : kodeJurusanFromNpm === "082"
  ? "2"
  : kodeJurusanFromNpm === "083"
  ? "3"
  : kodeJurusanFromNpm === "084"
  ? "4"
  : "";
  
  const [nama, setNama] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [pesan, setPesan] = useState("");
  const [jurusan, setJurusan] = useState(selectedJurusanFromKode);
  const [tipeMasukan, setTipeMasukan] = useState<"Aduan" | "Aspirasi">("Aduan");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(()=>{
    dispatch(setStatePageVisit({page:'aduan-dan-aspirasi'}))
  },[dispatch])
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const body = {
      nama,
      email,
      pesan,
      jurusan: {
        id: parseInt(jurusan),
        nama: listJurusan.find(
          (currentJurusan) => currentJurusan.id === parseInt(jurusan)
        )?.nama,
      },
      tipe: tipeMasukan,
      status_aduan: 2,
    };

    fetch(`${API_URL}/aspirasi-dan-aduans`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        fetch("/api/send-email", {
          method: "post",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
      })
      .then(() => {
        alert(`Berhasil mengirimkan ${tipeMasukan.toLocaleLowerCase()}`);
        setPesan("");
      })
      .catch(() => {
        alert(
          "Terdapat kesalahan, cek kembali form Anda atau coba beberapa saat lagi"
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  if (!session) {
    return (
      <>
        <Head>
          <title>
            Aduan dan Aspirasi | BEM Fasilkom UPN &quot;Veteran&quot; Jawa Timur
          </title>
        </Head>
        <div className={styles.pre_login_screen}>
          <h1 className={styles.login_text}>
            Untuk mengakses halaman ini, silakan login dengan{" "}
            <span className={styles.google_upn_text}>akun Google UPN</span> Anda
            terlebih dahulu
          </h1>
          <button
            className={styles.sign_in_with_google_btn}
            onClick={() =>
              signIn("google", {
                callbackUrl: `/aduan-dan-aspirasi`,
              })
            }
          >
            Login dengan Google
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DocumentHead pageTitle="Aduan dan Aspirasi" />
      <div
        className={styles.page_container}
        style={{ paddingTop: !session ? 0 : 80 }}
      >
        <header className={styles.title}>
          <h1 className={styles.title_main}>Aduan & Aspirasi</h1>
          <p className={styles.title_sub}>
            Hubungi kami dan salurkan aspirasi kalian{" "}
            <br className={styles.enter} />
            melalui formulir di bawah ini
          </p>
        </header>
        <section className={styles.form_section}>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.nama}>
              <label htmlFor="nama" className={styles.form_label}>
                Nama
              </label>
              <input
                type="text"
                id="nama"
                className={styles.input}
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                placeholder="ex, Felliani Kurniawati"
                required
                disabled={isSubmitting}
                readOnly
              />
            </div>
            <div className={styles.email}>
              <label htmlFor="email" className={styles.form_label}>
                Email
              </label>
              <br />
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="npm@student.upnjatim.ac.id"
                required
                disabled={isSubmitting}
                readOnly
              />
            </div>
            <div className={styles.jurusan}>
              <label htmlFor="jurusan" className={styles.form_label}>
                Jurusan
              </label>
              <br />
              <select
                name="jurusan"
                required
                className={styles.select}
                onChange={(event) => setJurusan(event.target.value)}
                disabled={isSubmitting || selectedJurusanFromKode !== ""}
              >
                <option value="" disabled>
                  Pilihan Jurusan
                </option>
                {listJurusan?.map((currentJurusan) => {
                  return (
                    <option
                      key={currentJurusan.id}
                      value={currentJurusan.kode_jurusan}
                      selected={jurusan === currentJurusan.id.toString()}
                    >
                      {currentJurusan.nama}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.radio_btn}>
              <div>
                <input
                  className={styles.radio_input}
                  type="radio"
                  name="opsi"
                  id="aduan"
                  value="aduan"
                  checked={tipeMasukan === "Aduan"}
                  onChange={() => setTipeMasukan("Aduan")}
                  required
                />
                <label htmlFor="aduan" className={styles.radio_label}>
                  Aduan
                </label>
              </div>
              <div>
                <input
                  className={styles.radio_input}
                  type="radio"
                  name="opsi"
                  id="aspirasi"
                  value="aspirasi"
                  checked={tipeMasukan === "Aspirasi"}
                  onChange={() => setTipeMasukan("Aspirasi")}
                />
                <label htmlFor="aspirasi" className={styles.radio_label}>
                  Aspirasi
                </label>
              </div>
            </div>
            <div className={styles.pesan}>
              <label htmlFor="pesan" className={styles.form_label}>
                Pesan
              </label>
              <br />
              <textarea
                name="pesan"
                id="pesan"
                className={styles.textarea}
                value={pesan}
                onChange={(event) => setPesan(event.target.value)}
                placeholder="Masukkan pesan"
                disabled={isSubmitting}
              ></textarea>
            </div>
            <input
              type="submit"
              value={isSubmitting ? "Mengirim" : "Kirim"}
              className={styles.submit_button}
              disabled={!nama || !email || !pesan || !jurusan || isSubmitting}
            />
          </form>
        </section>
        <div>
          <p>atau</p>
          <Link href="/status-aduan">
            <a className={styles.link_status_aduan}>Lihat Status Aduan</a>
          </Link>
        </div>
        
      </div>
      <button onClick={()=>signOut()} className="h-fit w-fit rounded-full border border-slate-200 text-white bg-red-600 p-2 px-5 shadow shadow-gray-500 hover:bg-white hover:border-red-600 hover:border-2 hover:font-bold hover:scale-[1.02] hover:text-red-600  mx-auto block ">Log-Out</button>
    </>
  );
};

type ServerSideData = {
  session: Session | null;
  listJurusan: Jurusan[];
};

export const getServerSideProps: GetServerSideProps<ServerSideData> = async (
  context
) => {
  const session = await getSession(context);
  const listJurusan = await (await fetch(`${API_URL}/jurusans`)).json();

  return {
    props: {
      session: session,
      listJurusan,
    },
  };
};

export default AduanDanAspirasi;
