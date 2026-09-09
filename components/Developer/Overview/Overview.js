import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import { buttons, tags_colors } from "@/data/developers";
import VoteIconSVG from "@/svg/VoteIcon";
import Link from "next/link";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import { useRouter } from "next/router";
import DribbleSVG from "@/svg/dribble";

const Overview = ({ data, topVoted }) => {
  const router = useRouter();
  const { account } = useEthers()
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState();
  const [optionShow, setOptionShow] = useState(false);
  const [optionSelected, setOptionSelected] = useState(10);
  const [active, setActive] = useState(0);
  const [vote, setVote] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);

  const nextPage = () => {
    if (page !== Math.ceil(data.length / perPage)) {
      setPage(page + 1);
      setPaginatedData(data.slice(page * perPage, (page + 1) * perPage));
    }
  };

  const updatePageItems = (number) => {
    setPerPage(number);
    setPaginatedData(data.slice(0, number));
    setPage(1);
  };

  const backPage = () => {
    if (page !== 1) {
      setPage(page - 1);
      setPaginatedData(data.slice((page - 2) * perPage, (page - 1) * perPage));
    }
  };

  const goToPage = (numPage) => {
    setPage(numPage);
    setPaginatedData(data.slice((numPage - 1) * perPage, numPage * perPage));
  };

  const handleActive = (index) => {
    setActive(index);
  };

  const handleOptionSelected = (number) => {
    setOptionSelected(number);
    setOptionShow(false);
    updatePageItems(number);
  };


  const canVote = async () => {
    if (!account) {
      return;
    }
    console.log("account", account)
    const res = await axios.post("/api/get_votes", {
      wallet_address: account
    });
    console.log("res.data", res.data)
    const data = res.data[res.data.length - 1];

    if (data) {
      console.log("data.created_at", data.created_at)
      let date = new Date(data.created_at);

      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      console.log("diffDays", diffDays)
      if (diffDays > 1) {
        setVote(true);
      } else {
        setVote(false);
      }
    } else {
      setVote(true);
    }

  }


  useEffect(() => {
    canVote();
  }, [account]);

  const Vote = async (contract_address) => {
    if (!vote) {
      alert("You can only vote once a day")
      return;
    }

    setVoteLoading(true);

    const res = await axios.post("/api/vote", {
      contract_address: contract_address,
      wallet_address: account
    });
    const data = res.data;
    console.log(data);
    setVote(false);
    console.log("We are reloading the page")
    router.reload();

  }


  const showOption = (val) => {
    setOptionShow(val);
  };


  useEffect(() => {
    if (data) {
      setPaginatedData(data.slice((page - 1) * perPage, page * perPage))
    }

  }, [data]);


  if (voteLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gold fill-gold" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <main className="workspace font-nunito_sans">
      <section className="breadcrumb">
        <h1 className="text-[32px] text-muted">DOGE your own research</h1>
        <ul className="text-[#57534E] text-sm flex mb-4">
          <li>
            <a href="#">Home</a>
          </li>
          <Image
            width={12}
            height={10}
            className="mx-2 "
            src="/images/arrow.svg"
            alt="arrow"
          />

          <li>
            <a href="#">Developers</a>
          </li>
          <Image
            width={12}
            height={10}
            className="mx-2 "
            src="/images/arrow.svg"
            alt="arrow"
          />

          <li className="text-muted">Overview</li>
        </ul>
      </section>

      <div className="mt-7 mb-12 px-3 md:px-9 pt-8">
        <div className="banner lg:h-[250px] md:h-[150px] h-[100px]">
          <div className="w-full h-full flex justify-between items-center banner-icons">
            <div className="font-gilroy font-extrabold pl-3 md:pl-12 text-[#B07329]">
              <span className="font-left lg:text-4xl xl:text-6xl md:text-3xl text-lg">
                One vote
                <br />
                <span className="text-xl md:text-4xl lg:text-5xl xl:text-8xl">PER DAY</span>
              </span>
            </div>
            <div className="flex justify-center">
              <div className="banner-center absolute lg:h-[150px] h-[50px]"></div>
              <span className="banner-text text-lg md:text-3xl lg:text-4xl xl:text-6xl ">
                DYOR <br />
                TOKENS
              </span>
            </div>
            <div className="font-gilroy font-extrabold text-right pr-3 md:pr-12 text-[#B07329]">
              <span className="font-right text-lg md:text-3xl lg:text-6xl">
                IF YOU HOLD
                <br />
                <span className="text-xl md:text-4xl lg:text-8xl">0.15%</span>
              </span>
            </div>
          </div>
        </div>
        {topVoted &&
          <div className="mt-16 top-rated flex flex-col">
            <span className="font-extrabold text-[36px] text-[#78716C]">
              Top Voted
            </span>

            <div className="w-full my-14 bg-white dark:bg-[#292524] rounded-2xl">
              <div className="table-header text-xs md:text-sm lg:text-lg font-extrabold text-[#57534E] rounded-t-2xl">
                <div className="py-7 w-full flex justify-between px-6">
                  <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                    Developer
                  </span>

                  <div className="lg:w-1/3 hidden lg:flex lg:justify-around">
                    <span className="flex w-full justify-center">
                      Telegram
                    </span>
                    <span className="flex w-full justify-center">
                      Chart
                    </span>
                  </div>

                  <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center ml-6 lg:ml-0">
                    Website
                  </span>
                  <span className="md:w-1/4 lg:w-1/6 hidden md:flex justify-center">
                    Projects
                  </span>
                  <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                    Votes
                  </span>
                </div>
              </div>

              <div>
                {topVoted.map((developer, index) => (
                  <div
                    className="px-6 py-4 flex items-center justify-between" key={index}
                  >
                    <Link href={`/developers/charts/${developer.developer_wallet}`} className="w-1/3 md:w-1/4 lg:w-1/6" >

                      <div className="flex items-center">
                        <img
                          src={`${developer.profile_picture}`}
                          alt="icon"
                          className="w-[40px] h-[40px]"
                        />
                        <div className="flex flex-col ml-1 lg:ml-4">
                          <div className="flex items-center">
                            <span className="text-[8px] md:text-sm lg:text-base text-[#57534E] font-extrabold">
                              {developer.developer_name}
                            </span>

                            {developer.verified && (
                              <Image
                                className="ml-1 lg:ml-2 w-3 h-3"
                                src={require("/public/images/overview/verified.svg")}
                                alt="verified"
                                width={12}
                                height={12}
                              />
                            )}
                          </div>

                          <div className="flex mt-1">
                            <div className="flex">
                              {developer.tags.map((tag, index) => (
                                <div
                                  className="sm:py-[1px] px-1 lg:px-2 lg:mr-[6px] scale-75 lg:scale-100"
                                  key={index}
                                  style={{
                                    backgroundColor: tags_colors[index].bg_color,
                                    color: tags_colors[index].text_color,
                                    borderRadius: tags_colors[index].radius,
                                  }}
                                >
                                  <span className="text-[8px] md:text-[10px] font-extrabold">
                                    {tag}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>


                    <Link href={`/developers/charts/${developer.developer_wallet}`} className="hidden lg:flex justify-center lg:w-1/6" >
                      <div className="text-sm text-[#78716C] flex justify-center font-extrabold">
                      <img src={("/images/telegram.svg")} alt="telegram" className="w-6 h-6 mr-1" />
                        {/* <span>{developer.telegram_project}</span> */}
                      </div>
                    </Link>
                    <Link href={`/developers/charts/${developer.developer_wallet}`} className="hidden lg:flex justify-center lg:w-1/6" >

                      <div className="text-sm text-[#CA8A04] flex justify-center font-extrabold">
                      <img src={("/images/poocoin.svg")} alt="telegram" className="w-6 h-6 mr-1" />

                        {/* <span>{developer.developer_website.slice(0, 12)}...</span> */}
                      </div>
                    </Link>


                    <Link href={`/developers/charts/${developer.developer_wallet}`} className="flex justify-center w-1/3 md:w-1/4 lg:w-1/6">

                      <div className="text-xs md:text-sm lg:ml-0 ml-10 text-[#78716C] font-extrabold">
                      <DribbleSVG className="fill-gold" />
                      </div>
                    </Link>
                    <Link href={`/developers/charts/${developer.developer_wallet}`} className="hidden md:w-1/4 lg:w-1/6 md:flex justify-center">

                      <div className="text-sm text-[#78716C]  font-extrabold">
                        <span>{developer.number_of_projects}</span>
                      </div>
                    </Link>
                    <div className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                      <div className="flex min-w-[100px] items-center justify-center group cursor-pointer gap-x-2 px-[5px] md:px-[10px] py-3 border border-[#CA8A04] rounded-md hover:bg-gold text-[#CA8A04] hover:text-white"
                        onClick={() => Vote(developer.contract_address)}>
                        <VoteIconSVG className="fill-gold group-hover:fill-white" />

                        <span className=" font-semibold text-xs md:text-base">
                          {developer.votes}
                        </span>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>}

        <div className="flex mt-10 items-center justify-between">
          <div className="lg:hidden">
            <button className="border flex items-center gap-x-2 py-2 px-3 border-[#CA8A04] rounded-[7px] bg-transparent">
              <Image
                src={require("/public/images/overview/filter.svg")}
                alt="filter"
                width={20}
                height={20}
              />
              <span className="font-extrabold text-[#CA8A04]">Filters</span>
            </button>
          </div>
          <div className="lg:flex items-center gap-x-4 hidden">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`border flex items-center gap-x-2 py-2 px-3 border-[#CA8A04] rounded-[7px] ${active === button.id ? "bg-[#CA8A04]" : " bg-transparent"
                  }`}
                onClick={() => {
                  handleActive(button.id);
                }}
              >
                <Image
                  src={require(`/public/images/overview/${active === button.id ? button.active_icon : button.icon
                    }`)}
                  alt={button.name}
                  width={20}
                  height={20}
                />

                <span
                  className={`${active === button.id
                    ? "font-extrabold text-white dark:text-[#1C1917]"
                    : "font-extrabold text-[#CA8A04]"
                    }`}
                >
                  {button.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center">
            <span className="font-bold text-sm text-[#78716C]">
              Results per page:
            </span>

            <div className="flex items-center bg-white dark:bg-[#1C1917]  ml-1 pl-[10px] rounded-[3px]">
              <div className="pr-[5px]">
                <span className="font-bold text-sm dark:text-[#57534E] ">
                  {optionSelected}
                </span>
              </div>
              <div
                className="px-[6px] cursor-pointer py-2 border-l border-[#292524] h-full"
                onClick={() => {
                  showOption(!optionShow);
                }}
              >
                <Image
                  src={require("/public/images/overview/arrow-down.svg")}
                  alt="arrow-down"
                  width={10}
                  height={10}
                />
              </div>
            </div>
          </div>
        </div>
        {optionShow && (
          <div className="flex justify-end -mt-[6px]">
            <div className="w-14 absolute">
              <div className="w-full py-1 gap-y-1 rounded bg-white dark:bg-[#1C1917] flex flex-col items-center">
                {[10, 20, 50].map((item, index) => (
                  <div
                    className="flex justify-center cursor-pointer w-full h-full hover:bg-[#CA8A04] dark:text-[#57534E] hover:text-[#1C1917]"
                    key={index}
                    onClick={() => {
                      handleOptionSelected(item);
                    }}
                  >
                    <span className="font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {paginatedData &&
          <div className="w-full my-14 bg-white dark:bg-[#292524] rounded-2xl">
            <div className="table-header text-xs md:text-sm lg:text-lg font-extrabold text-[#57534E] rounded-t-2xl">
              <div className="py-7 w-full flex justify-between px-6">
                <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                  Developer
                </span>
                <span className="w-1/6 lg:flex justify-center hidden">
                Telegram
                </span>
                <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center ml-6 lg:ml-0">
                  Chart
                </span>
                <span className="w-1/6 lg:flex justify-center hidden">
                  Website
                </span>
                <span className="md:w-1/4 lg:w-1/6 hidden md:flex justify-center">
                  Projects
                </span>
                <span className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                  Votes
                </span>
              </div>
            </div>
            <div>
              {active === 0 && paginatedData.map((developer, index) => (
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  key={index}
                >
                  <Link href={`/developers/charts/${developer.developer_wallet}`} className=" w-1/3 md:w-1/4 lg:w-1/6" >

                    <div className="flex items-center">
                      <img
                        src={`${developer.profile_picture}`}
                        alt={developer.profile_picture}
                        className="w-[40px] h-[40px]"
                      />
                      <div className="flex flex-col ml-1 lg:ml-4">
                        <div className="flex items-center">
                          <span className="text-[8px] md:text-sm lg:text-base text-[#57534E] font-extrabold">
                            {developer.developer_name}
                          </span>

                          {developer.verified && (
                            <Image
                              className="ml-1 lg:ml-2 w-3 h-3"
                              src={require("/public/images/overview/verified.svg")}
                              alt="verified"
                              width={12}
                              height={12}
                            />
                          )}
                        </div>

                        <div className="flex mt-1">
                          <div className="flex">
                            {developer.tags.map((tag, index) => (
                              <div
                                className="py-[1px] px-1 lg:px-2 lg:mr-[6px] scale-75 lg:scale-100"
                                key={index}
                                style={{
                                  backgroundColor: tags_colors[index].bg_color,
                                  color: tags_colors[index].text_color,
                                  borderRadius: tags_colors[index].radius,
                                }}
                              >
                                <span className="text-[10px] font-extrabold">
                                  {tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/developers/charts/${developer.developer_wallet}`} className="w-1/6 lg:flex hidden justify-center">
                    <div className="text-sm  text-[#57534E] font-extrabold">
                      <img src={("/images/telegram.svg")} alt="telegram" className="w-6 h-6 mr-1" />
                      {/* <span>{developer.telegram_project}</span> */}
                    </div>
                  </Link>
                  <Link href={`/developers/charts/${developer.developer_wallet}`} className="w-1/6 hidden lg:flex justify-center">
                    <div className="text-sm text-[#CA8A04]  font-extrabold">
                      <img src={("/images/poocoin.svg")} alt="telegram" className="w-6 h-6 mr-1" />
                      {/* <span>{developer.developer_website.slice(0, 12)}...</span> */}
                    </div>
                  </Link>
                  <Link href={`/developers/charts/${developer.developer_wallet}`} className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                    <div className="text-sm text-[#78716C]   font-extrabold">
                      <DribbleSVG className="fill-gold" />
                      {/* <span>{developer.developer_website.slice(0, 12)}...</span> */}
                    </div>
                  </Link>
                  <Link href={`/developers/charts/${developer.developer_wallet}`} className="hidden md:w-1/4 lg:w-1/6 md:flex justify-center">
                    <div className="text-xs md:text-sm text-[#78716C]    font-extrabold">
                      <span>{developer.number_of_projects}</span>
                    </div>
                  </Link>
                  <div className="w-1/3 md:w-1/4 lg:w-1/6 flex justify-center">
                    <div className="flex min-w-[100px] items-center justify-center group cursor-pointer gap-x-2 px-[5px] md:px-[10px] py-3 border border-[#CA8A04] rounded-md hover:bg-gold text-[#CA8A04] hover:text-white"
                      onClick={() => Vote(developer.contract_address)}>
                      <VoteIconSVG className="fill-gold group-hover:fill-white" />

                      <span className=" font-semibold text-xs md:text-base">
                        {developer.votes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        {data &&
          <div className="flex justify-center mb-10 items-center gap-x-5">
            <button onClick={backPage}>
              <Image
                src={require("/public/images/overview/pagination-prev.svg")}
                alt="pagination-prev"
                height={14}
                width={7}
              />
            </button>
            {new Array(Math.ceil(data.length / perPage))
              .fill()
              .map((_, i) => i + 1)
              .map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    goToPage(item);
                  }}
                  className="text-[20px] font-bold"
                  style={{
                    color: page === item ? "#CA8A04" : "#57534E",
                  }}
                >
                  {item}
                </button>
              ))}
            <button onClick={nextPage}>
              <Image
                src={require("/public/images/overview/pagination-next.svg")}
                alt="pagination-next"
                height={14}
                width={7}
              />
            </button>
          </div>}
      </div>
    </main>
  );
};

export default Overview;
