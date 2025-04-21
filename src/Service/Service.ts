import { useEffect, useState } from "react";
import axios from "axios";

// Service to fetch employees data from a REST API

interface Geo{
    lat: string;
    lng: string;
}
interface Company{
    name: string;
    catchPhrase: string;
    bs: string;
}
interface Address{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}
interface User{
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const Service = () => {
  const [users, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUser(response.data);
      } catch (err: any) {
        setError(err.message || "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array = fetch only on mount

  return { users, loading, error };
};

export default Service;
