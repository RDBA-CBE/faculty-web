import React, { useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dropdown, useSetState } from "@/utils/function.utils";
import Models from "@/imports/models.import";
import CustomSelect from "../dropdown";

const NewHeroSection = () => {
  const router = useRouter();
  const [state, setState] = useSetState({
    search: "",
    location: "",
    colleges: [],
    locationList: [],
  });

  useEffect(() => {
    locationList();
    collegeList();
  }, []);

  const locationList = async () => {
    try {
      const res: any = await Models.location.list();
      const dropdown: any = Dropdown(res?.results, "city");
      setState({
        locationList: dropdown,
      });
    } catch (error) {
      console.log("error fetching locations", error);
    }
  };

  const collegeList = async () => {
    try {
      const res: any = await Models.colleges.list();
      const dropdown = Dropdown(res?.results, "name");

      setState({
        collgeList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state.search) params.append("search", state.search);
    if (state.location) params.append("location", state.location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/banner_bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="section-wid w-full  py-16 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
            {/* Heading */}
            <div className="space-y-5">
              <h1 className="text-[35px] lg:text-[40px] xl:text-[50px] leading-[50px] lg:leading-[66px] xl:leading-[74px] font-bold text-white">
                Find Your Dream Job Today!
              </h1>
              <p className="text-white max-w-xl text-base lg:text-lg leading-relaxed">
                Ultrices purus dolor viverra mi laoreet at cursus justo.
                Ultrices purus diam egestas amet faucibus tempor blandit. Elit
                velit mauris aliquam est diam. Leo
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-[40px] shadow-lg p-6 sm:p-2 flex flex-col sm:flex-row gap-4 sm:gap-0 items-stretch sm:items-center max-w-full lg:max-w-3xl">
              <input
                type="text"
                placeholder="Job Title or College"
                className="w-full sm:flex-1 px-6 py-4 sm:py-3 focus:outline-none text-base sm:text-base rounded-full sm:rounded-l-full sm:rounded-r-none border-b sm:border-b-0 border-gray-100 placeholder:text-gray-400"
                value={state.search}
                onChange={(e) => setState({ search: e.target.value })}
              />
              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
              <div>
                <CustomSelect
                  className="w-auto px-6 py-4 sm:py-3 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700"
                  placeholder="Select Location"
                  options={state.locationList}
                  value={state?.location || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      location: selected ? selected.value : "",
                    })
                  }
                />
              </div>

              {/* <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
             <div>
                <CustomSelect
                  className="w-auto px-6 py-4 sm:py-3 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700"
                  placeholder="Select Colleges"
                  options={state.collgeList}
                  value={state?.colleges || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      colleges: selected ? selected.value : "",
                    })
                  }
                />
              </div> */}

              <button
                className="w-full sm:w-auto bg-[#F2B31D] text-black px-8 py-4 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#e0a519] transition text-base font-semibold whitespace-nowrap"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5" />
                Search Job
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-8 lg:gap-12 pt-2">
              <div>
                <div className="text-4xl lg:text-3xl font-bold text-white mb-1">
                  125K+
                </div>
                <div className="text-white text-base">People joined</div>
              </div>

              <div>
                <div className="text-4xl lg:text-3xl font-bold text-white mb-1">
                  9,99%
                </div>
                <div className="text-white text-base">Success Probability</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-4xl lg:text-3xl font-bold text-white">
                    5.0
                  </div>
                  <div className="flex text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F2B31D]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {["image_1", "image_2", "image_3"].map((img, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                    >
                      <Image
                        src={`/assets/images/${img}.png`}
                        alt="user"
                        width={48}
                        height={48}
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 bg-black text-white rounded-full border-2 border-white flex items-center justify-center text-lg font-bold">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:flex justify-end items-end h-full">
            <div className="relative w-full h-full flex items-end justify-end">
              <Image
                src="/assets/images/banner_logo.png"
                alt="Hero Banner"
                width={600}
                height={600}
                className="object-contain object-bottom w-auto h-[600px] xl:h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
