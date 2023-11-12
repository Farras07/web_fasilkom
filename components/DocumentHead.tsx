import Head from "next/head";

type Props = {
  pageTitle?: string;
  children?: React.ReactNode;
};

export const DocumentHead = ({ pageTitle }: Props) => {
  return (
    <Head>
      <link
        rel="shortcut icon"
        href="/assets/image/logo_bismit_small.png"
        type="image/x-icon"
      />
      <title>
        {pageTitle ? `${pageTitle} | ` : null} {'BEM FASILKOM UPN "Veteran" Jawa Timur'}
      </title>
    </Head>
  );
};
