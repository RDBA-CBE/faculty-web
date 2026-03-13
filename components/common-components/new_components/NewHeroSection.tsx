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
    <section className="relative h-fit md:h-[95vh] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/banner-1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="section-wid h-full  mx-auto  py-16 lg:py-0   relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 xl:gap-12 2xl:gap-16  h-full">
          {/* Left Content - Aligned to bottom */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
            {/* Heading */}
            <div className="space-y-5">
              <h1 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] leading-[50px] lg:leading-[66px] xl:leading-[60px] font-semibold text-white">
                Where Academic Talent <br /> Meets Institutional Excellence
              </h1>
              <p className="text-[#F0F0F0CC] max-w-xl text-base lg:text-lg leading-relaxed">
                FacultyPro connects qualified academic professionals with
                reputed colleges and universities seeking excellence in
                teaching, research, and institutional development. Explore
                verified opportunities and take the next step in your
                professional journey
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-[40px] shadow-lg p-4 sm:p-2 flex flex-col sm:flex-row gap-4 sm:gap-0 items-stretch sm:items-center max-w-full lg:max-w-3xl">
              <input
                type="text"
                placeholder="Job Title or College"
                className="w-full sm:flex-1 px-3 py-2 sm:px-6 sm:py-3 focus:outline-none text-base sm:text-base rounded-full sm:rounded-l-full sm:rounded-r-none border-b sm:border-b-0 border-gray-100 placeholder:text-[#373535]"
                value={state.search}
                onChange={(e) => setState({ search: e.target.value })}
              />
              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
              <div>
                <CustomSelect
                  className="w-auto placeholder:text-[#373535]  px-3 py-2 sm:px-6 sm:py-3 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700"
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

              <button
                className="w-full sm:w-auto bg-[#F2B31D] text-black  md:px-8 py-3 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#e0a519] transition text-sm md:text-base font-semibold whitespace-nowrap"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5" />
                Search Job
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-4 md:gap-8 lg:gap-12 pt-8 md:pt-2">
              <div>
                <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white mb-1">
                  125K+
                </div>
                <div className="text-white text-sm">Registered Academic <br /> Professionals</div>
              </div>

              <div>
                <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white mb-1">
                  9000+
                </div>
                <div className="text-white text-sm">Successful Faculty <br /> Appointments</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white">
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
                <div className="text-white text-sm">Trusted by Institutions <br /> and Educators</div>
                {/* <div className="flex -space-x-3 xl:-space-x-4">
                  {["image_1", "image_2", "image_3"].map((img, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full border-2 border-white overflow-hidden shadow-lg"
                    >
                      <Image
                        src={`/assets/images/${img}.png`}
                        alt="user"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 sm:w-12 sm:h-12 xl:w-12 xl:h-12  bg-black text-white rounded-full border-2 border-white flex items-center justify-center text-base sm:text-lg xl:text-xl 2xl:text-2xl font-bold shadow-lg">
                    +
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Image - Aligned to bottom */}
          <div className="relative hidden lg:flex justify-end items-end h-full">
            <div className="relative w-full h-full flex items-end justify-end">
              <Image
                src="/assets/images/banner_logo.png"
                alt="Hero Banner"
                width={800}
                height={800}
                className="object-contain object-bottom w-auto h-[300px] sm:h-[550px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div> */}
    </section>
  );
};

export default NewHeroSection;
