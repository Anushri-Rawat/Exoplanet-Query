import React from "react";

const NoResults = () => {
  return (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-lg leading-1.5 tracking-tighter font-semibold flex flex-col items-center text-gray-500">
              <p>Exoplanets are planets outside the solar System</p>
              <p>
                Here you can query{" "}
                <span className="text-blue-500">NASA's Exoplanet Archive</span>{" "}
                and find the one you love the most
              </p>
            </div>
          </div>
  );
};

export default NoResults;
