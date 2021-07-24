import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import{ format } from "date-fns"
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
        <h2>loading....</h2>
      </header>
    );
  }

  const {bio, positions} = data;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>{bio.name}</h1>
        <h2>{bio.tagline}</h2>
      </header>

<div className={styles.split}>
  <div className={styles.left}>
    <h2>Contact</h2>
    <p>
      <strong>Email</strong>{" "}
      <a href={`mailto:${bio.email}`}>{bio.email}</a>
    </p>
    <p>
      <strong>GitHub</strong>{" "}
      <a href={bio.github}>{bio.github.replace("https://", "")}</a>
    </p>
    <p>
      <strong>LinkedIn</strong>{" "}
      <a href={bio.linkedin}>{bio.linkedin.replace("https://www.", "")}</a>
    </p>
  </div>
  <div className={styles.right}>
    <h2>Objective</h2>
    <p>{bio.objective}</p>

    <h2>Experience</h2>
    {positions.map(position => {
     const length = [
      position.years > 0 ? `${position.years} yrs` : null,
      position.months > 0 ? `${position.months} mths` : null,
    ]
      .filter((str) => str)
      .join(" ");

      return(
      <div key={position.id}>
        <h3>{position.title}</h3>
        <p className={styles.light}>
          {position.company} | {position.location}
        </p>
        <p>
          {format(new Date(position.startDate), "MMM yyyy")} - {" "}
        {position.endDate ? format(new Date(position.endDate), "MMM yyyy") :"Current"}
        </p>
        </div>)
    })}
  </div>
</div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
