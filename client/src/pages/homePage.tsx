import React, { useState } from 'react'; 
import FlightList from '../components/flights';
import SearchBar from '../components/searchBar';
import { Flight, searchAirportByCode, searchFlightsByAirports } from '../services/service';


const HomePage: React.FC = () => {
    // Explicitly typing the state as Flight[] resolves the error.
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  
    const handleSearch = async (from: string, to: string) => {
      try {
        const fromAirports = await searchAirportByCode(from);
        const toAirports = await searchAirportByCode(to);
  
        if (fromAirports.length === 0 || toAirports.length === 0) {
          console.error("Invalid airport code entered");
          setFilteredFlights([]);
          return;
        }
  
        const fromAirport = fromAirports[0];
        const toAirport = toAirports[0];
  
        const flights = await searchFlightsByAirports(
          fromAirport.AirportID,
          toAirport.AirportID
        );
  
        setFilteredFlights(flights);
        console.log("Found flights:", flights);
      } catch (error) {
        console.error("Search error:", error);
      }
    };
  
    return (
      <>
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Flight Finder
                </h1>
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  built by neil, evan, callum and michael
                </h2>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-6 py-10 sm:py-15">
            <FlightList flights={filteredFlights} />
          </div>
        </div>
      </>
    );
  };
  
  export default HomePage;