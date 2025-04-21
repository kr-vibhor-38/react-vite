import { useEffect, useState } from "react";
import axios from "axios";

interface Answer{
    answer: string;
    votes: number;
}
interface Question{
    questionId: string;
    questionText: string;
    responses: Answer[];
}
const AnalyticsService = () => {
    const [questions, setUser] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get("https://dummyjson.com/c/10eb-e674-4c23-ac0e");
          setUser(response.data);
        } catch (err: any) {
          setError(err.message || "Error fetching users.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmployees();
    }, []); // Empty dependency array = fetch only on mount
  
    return { questions, loading, error };
  };
  
  export default AnalyticsService;