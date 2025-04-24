import React, { useState } from 'react'; 
import FlightList from '../components/flights';
import SearchBar from '../components/searchBar';
import Login from '../components/login';
import { Flight, searchAirportByCode, searchFlightsByAirports, Airport, getUserById, User, getSavedFlights } from '../services/service';


const HomePage: React.FC = () => {
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [savedFlights, setSavedFlights] = useState<Flight[]>([]);

    const [user, setUser] = useState<User | null>(null);
  
    const handleSearch = async (from: string, to: string) => {
      try {
        const fromAirport: Airport = await searchAirportByCode(from);
        const toAirport: Airport = await searchAirportByCode(to);

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

    const handleLogin = async (password: string) => {
      console.log("Password entered: ", password);
      try {
        const user = await getUserById(password);
        console.log("User found: ", user);
        setUser(user);
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    const handleLogout = () => {
      setUser(null);
      console.log("User logged out");
    };

    const handleSavedFlights = async () => {
      if (user) {
        try {
          const saved = await getSavedFlights(user.UserId.toString());
          console.log(`${user.FirstName}'s Saved Flights:`, saved);
          setSavedFlights(saved);
        } catch (error) {
          console.error("Error fetching saved flights:", error);
        }
      } else {
        console.error("User not logged in");
      }
    }
  
    return (
      <>
        <div className="relative">
          <div className="absolute top-4 right-4">
            <Login user={user} onLogin={handleLogin} onLogout={handleLogout} onSave={handleSavedFlights} saved={savedFlights}/>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Flight Finder
              </h1>
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                built by neil, evan, callum and michael
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-6 py-10 sm:py-15">
            <FlightList flights={filteredFlights} />
          </div>
        </div>
      </>
    );
  };
  
  export default HomePage;