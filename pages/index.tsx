import Head from "next/head";
import { useQuery, gql } from "@apollo/Client";
import styles from "../styles/Home.module.css";

const ResumeQuery = gql`
  query ResumeQuery {
    bio {
      name
      tagline
      linkedin
      github
      email
      objective
    }
    positions {
      id
      title
      company
      location
      endDate
      startDate
      years
      months
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(ResumeQuery);

  if (error) {
    return <span>Error... oops!</span>;
  }
  if (loading) {
    return (
      <header className={styles.header}>
        <h1>Jordan Lewis</h1>
        <h2>Loading....</h2>
      </header>
    );
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
