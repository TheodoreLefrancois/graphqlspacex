import { gql, useQuery } from "@apollo/client";
import "./spacex.css";
function App() {
  const { loading, data } = useQuery(gql`
    query {
      launches(limit: 5) {
        details
        mission_name
        links {
          video_link
        }
        rocket {
          rocket_name
        }
        launch_success
        launch_date_utc
      }
    }
  `);
  console.log(data);
  return (
    <div className="App bg-black">
      {loading ? (
        <p>Loading</p>
      ) : data ? (
        <div className="flex flex-wrap">
          {data.launches.map((launched) => {
            return (
              <div
                className=" flex flex-col max-w-300 border-2 border-red-200 m-3 p-3 divide-y-2 w-full text-white"
                key={launched.mission_name}
              >
                <div className="flex flex-row divide-x-2 text-red-500 justify-baseline">
                  <span className="p-2 text-center w-full">
                    {launched.mission_name}
                  </span>
                  <span className="p-2 text-center w-full">
                    {launched.rocket.rocket_name}
                  </span>
                </div>
                <p className="p-2 text-red-500">
                  {launched.details || "No description for this project"}
                </p>
                <p className="p-2">
                  Rocket lauched at{`  `}
                  <span className="pl-2 italic">
                    {launched.launch_date_utc}
                  </span>
                  <span
                    className={`upperCase pl-2 text-${
                      launched.launch_success ? "green" : "red"
                    }-500`}
                  >
                    {launched.launch_success ? "Successully" : "Unsuccessfully"}
                  </span>
                </p>
                <p className="text-center p-2">
                  View More on{`  `}
                  <a
                    href={launched.links.video_link}
                    target="__blanck"
                    className="text-red-500"
                  >
                    YouTube
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Error something went wrong</div>
      )}
    </div>
  );
}

export default App;
