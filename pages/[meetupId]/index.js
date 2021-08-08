import MeetupDetail from "../../components/meetups/MeetupDetail";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
function MeetupDetailPage(props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content="View your meetups" />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        desc={props.meetupData.description}
      />
    </>
  );
}

export const getStaticPaths = async () => {
  // We should describe all the possible dynamic segment values here

  const client = await MongoClient.connect(
    "mongodb+srv://x_hrsht_x:hrsht-x007@cluster0.yos87.mongodb.net/nextjs-app-meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find(
      {
        /* Filter criteria(special objects) */
      },
      {
        /* Fields to be returned */
        _id: 1,
      }
    )
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://x_hrsht_x:hrsht-x007@cluster0.yos87.mongodb.net/nextjs-app-meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    /* Filter criteria(special objects) */
    _id: ObjectId(meetupId),
  });

  client.close();

  // As this code only runs on server the output can only be seen in terminal.

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 5,
  };
};

export default MeetupDetailPage;
