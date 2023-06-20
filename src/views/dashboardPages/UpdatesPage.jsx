import React, { useEffect, useState } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import * as dayjs from "dayjs";

// import { Document, Page, pdfjs } from "react-pdf";
// import pdfDist from "../../../node_modules/pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfDist;

const DashboardUpdates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestCaller = () => {
    setLoading(true);
    serverUnauth
      .get(`/updates/get-all`)
      .then((res) => {
        setData(res?.data?.data?.updates);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestCaller();
  }, []);

  return (
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-3xl font-bold leading-none text-secondary mt-2">
          Latest Updates
        </h5>
      </div>
      <div className="flex flex-col gap-6 my-2">
        {loading ? (
          <>
            <UpdateLaodingCard />
            <UpdateLaodingCard />
            <UpdateLaodingCard />
            <UpdateLaodingCard />
            <UpdateLaodingCard />
            <UpdateLaodingCard />
            <UpdateLaodingCard />
          </>
        ) : (
          data?.map((val) => {
            return (
              <Card
                title={val?.title}
                description={val?.description}
                imageMain={val?.imageMain}
                document={val?.document}
                createdAt={val?.createdAt}
              />
            );
          })
        )}
      </div>
      {/* <button
        onClick={() => {}}
        className="text-secondary font-semibold text-lg text-center w-full mt-4"
      >
        See Older
      </button> */}
    </div>
  );
};

export default DashboardUpdates;

const Card = ({ title, description, imageMain, document, createdAt }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [iframLoad, setIframLoad] = useState(false);

  return (
    <div
      className="bg-white shadow-md rounded-lg py-2 px-2 md:px-4 lg:px-6"
      data-aos="fade-up"
      data-aos-offset="50"
    >
      <div className="flow-root">
        <div role="list" className="divide-y divide-gray-200">
          <div className="py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  className="w-28 h-28 rounded-2xl object-cover"
                  src={imageMain}
                  alt="Lana image"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0 w-full">
                <p className="text-secondary font-semibold text-xl mb-4">
                  {title}
                </p>
                <p className="font-medium text-secondaryr mb-2 ">
                  {description}
                </p>
                <p className="text-sm text-gray-700 truncate">
                  {dayjs(createdAt).format("YYYY-MM-DD  HH:mm")}
                </p>
              </div>
              {document && (
                <>
                  <button
                    className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 w-full lg:w-40 text-center "
                    onClick={() => setShowPdf(!showPdf)}
                  >
                    {showPdf ? "Hide" : "View"}
                  </button>
                </>
              )}
            </div>
            {showPdf && (
              <div
                className="w-full mt-4"
                data-aos="fade-up"
                data-aos-offset="50"
              >
                <iframe
                  maximum-scale="3"
                  src={`https://docs.google.com/gview?embedded=true&url=${document}`}
                  height={window.innerWidth >= 768 ? "600px" : "500px"}
                  className="mx-auto w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateLaodingCard = () => {
  return (
    <div class="bg-white p-2 sm:p-4 sm:h-32 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
      <div class="flex flex-col flex-1 gap-5 sm:p-2">
        <div class="flex flex-1 flex-col gap-3">
          <div class="bg-gray-200 w-full animate-pulse h-6 rounded-2xl"></div>
          <div class="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
        </div>
        <div class="mt-auto flex gap-3">
          <div class="bg-gray-200 w-32 h-4 animate-pulse rounded-full"></div>
          <div class="bg-gray-200 w-20 h-4 animate-pulse rounded-full ml-auto"></div>
        </div>
      </div>
    </div>
  );
};
