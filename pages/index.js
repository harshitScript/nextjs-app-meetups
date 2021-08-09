// our-domain.com/
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <link
          rel="icon"
          href="https://static.thenounproject.com/png/2059526-200.png"
        />
        <meta
          name="description"
          content="Browser a huge list of highly active React meetups"
        />
      </Head>
      {console.log(props.meetups)}
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// ONLY PRE-RENDERES DURING BUILD(NOTHING TO DO WITH REQUESTS)
export const getStaticProps = async () => {
  // ANY CODE THAT WILL EXECUTE ON THE SERVER(NEVER EXECUTE ON THE CLIENT SIDE)
  // fetch data from some API
  // Read/write files
  // Any code related to server.

  const client = await MongoClient.connect(
    "mongodb+srv://x_hrsht_x:hrsht-x007@cluster0.yos87.mongodb.net/nextjs-app-meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

/*
// EXECUTES EVERY TIME THE REQUEST HITS THE SERVER.
export const getServerSideProps = (context) => {
  // ANY CODE THAT WILL EXECUTE ON THE SERVER(NEVER EXECUTE ON THE CLIENT SIDE)

  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};
*/
export default HomePage;
