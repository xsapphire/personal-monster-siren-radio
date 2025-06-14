import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MyPlayListItem } from "../type";

const readJsonFile = (file: File): Promise<MyPlayListItem[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        resolve(jsonData);
      } catch (error) {
        reject(new Error("Invalid JSON file: " + error));
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

interface FileContextType {
  selectedFileName: string;
  importedList: MyPlayListItem[];
  setFile: (file: File | null) => void;
  clearSelection: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [importedList, setImportedList] = useState<MyPlayListItem[]>([]);

  const clearSelection = () => {
    setFile(null);
    setImportedList([]);
  };

  useEffect(() => {
    if (file) {
      readJsonFile(file)
        .then((playlist) => {
          setImportedList(playlist);
        })
        .catch((error) => {
          console.error("Error reading file:", error);
        });
    }
  }, [file]);

  return (
    <FileContext.Provider
      value={{
        selectedFileName: file?.name || "",
        importedList,
        setFile,
        clearSelection,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
