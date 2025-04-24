import { useEffect, useState } from "react";
import axios from "axios";
import {TheData} from"../Model/dataModel.ts"




const LidkarService = ()=>{
    const [info, setInfo] = useState<TheData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://pollmonk-server.sunplussoftware.com:4101/p12_mm_get_survey/get_survey_res/?feedid=MQ==");
            setInfo(response.data);
          } catch (err: any) {
            setError(err.message || "Error fetching responses.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array = fetch only on mount

      return { info, loading, error };
};

export default LidkarService;