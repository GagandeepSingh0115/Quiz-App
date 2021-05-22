import { useContext, createContext, useState, useEffect } from "react";
import { Quizzies } from "../../data/db.types";
import axios, { AxiosError } from "axios";

type Context = {
  quizzes: Quizzies | null;
};
type serverResponse = { success: boolean; quzzies: Quizzies };
type ServerError = { errorMessage: string };

const QuizzesContext = createContext<Context>({} as Context);

export const QuizzezProvider: React.FC = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quizzies | null>(null);

  const getPlaylist = async (): Promise<serverResponse | ServerError> => {
    try {
      const res = await axios.get<serverResponse>(
        "https://GreenifyQuiz.gagandeogan.repl.co"
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
      console.log(err);
      return { errorMessage: "something went wrong!" };
    }
  };
  useEffect(() => {
    (async () => {
      const data = await getPlaylist();
      if ("success" in data) {
        return setQuizzes(data.quzzies);
      }
    })();
  }, []);

  return (
    <QuizzesContext.Provider value={{ quizzes }}>
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzez = () => {
  return useContext(QuizzesContext);
};
