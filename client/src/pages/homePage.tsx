import React, { useState } from 'react'; 
import FlightList from '../components/flights';
import SearchBar from '../components/searchBar';
import Login from '../components/login';
import HTSearch from '../components/htsearch';
import HTFlightList from '../components/htflights';
import { Flight, searchAirportByCode, searchFlightsByAirports, Airport, getUserById, User, getSavedFlights, saveFlight, deleteFlight, SavedFlight, updateFlight, popularity, PopFlight } from '../services/service';


const HomePage: React.FC = () => {
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [savedFlights, setSavedFlights] = useState<SavedFlight[]>([]);
    const [htFlights, setHTFlights] = useState<PopFlight[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isHTVisible, setIsHTVisible] = useState(false);
  
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
      setSavedFlights([]);
      setFilteredFlights([]);
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

    const handleSave = async (FlightID: number, Quantity: number) => {
      console.log(`Saving flight with payload: ${ user!.UserId},${FlightID } `); 
      saveFlight(user!.UserId, FlightID, Quantity)
    };

    const handleDelete = async (FlightID: number) => {
      console.log(`Deleting flight with payload: ${ user!.UserId},${FlightID } `); 
      deleteFlight(user!.UserId, FlightID)
      setSavedFlights((prevFlights) => prevFlights.filter((flight) => flight.FlightID !== FlightID));
    };

    const handleUpdate = async (SavedFlightID: number, Quantity: number) => {
      console.log(`Updating flight with payload: ${SavedFlightID },${Quantity } `); 
      updateFlight(SavedFlightID, Quantity);
    };

    const onhtSearch = async (airport: string) => {
      const airport_ = await searchAirportByCode(airport);
      const flights = await popularity(airport_.AirportID);
      console.log("Found flights:", flights);
      setHTFlights(flights);
    };


  
    return (
      <>
        <div className="relative">
        <div className="absolute top-4 left-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          onClick={() => setIsHTVisible(!isHTVisible)}
        >
          {isHTVisible ? "Search" : "High Traffic"}
        </button>
      </div>

          <div className="absolute top-4 right-4">
            <Login user={user} onLogin={handleLogin} onLogout={handleLogout} onSave={handleSavedFlights} saved={savedFlights} onDelete={handleDelete} onUpdate={handleUpdate} />
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
          {isHTVisible ? (
            <>
              <HTSearch onSearch={onhtSearch} />
              <div className="mt-6 py-10 sm:py-15">
                <HTFlightList flights={htFlights} onSave={handleSave} />
              </div>

            
            </>

          ) : (
            <>
              <SearchBar onSearch={handleSearch} />
              <div className="mt-6 py-10 sm:py-15">
                <FlightList flights={filteredFlights} onSave={handleSave} />
              </div>
            </>

          )}
          
        </div>
      </>
    );
  };
  
  export default HomePage;