import { FiCheck, FiFolder } from "react-icons/fi";
import styled from "styled-components";
import { useFileContext } from "../context/FileContext";
import { Theme, useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";
import { FlexBox } from "./FlexBox";

const FileSelectorContainer = styled(FlexBox)<{
  $theme: Theme;
  $hasSelectedFile: boolean;
}>`
  border: ${({ $hasSelectedFile, $theme }) =>
    $hasSelectedFile ? "none" : `1px dashed ${themeColors[$theme].text}`};
  padding: 40px;
`;

export const FileSelector = () => {
  const { selectedTheme } = useTheme();
  const { setFile, selectedFileName } = useFileContext();

  return (
    <>
      <FileSelectorContainer
        $direction="column"
        $center="xy"
        $theme={selectedTheme}
        $hasSelectedFile={!!selectedFileName}
      >
        <p style={{ fontSize: "2rem" }}>
          {selectedFileName ? <FiCheck /> : <FiFolder />}
        </p>
        <label
          htmlFor="upload-playlist-json"
          style={{ cursor: "pointer", color: themeColors[selectedTheme].text }}
        >
          {selectedFileName
            ? `Selected file ${selectedFileName}`
            : `Select a JSON file`}
        </label>
      </FileSelectorContainer>

      <input
        type="file"
        id="upload-playlist-json"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        accept=".json"
        style={{ display: "none" }}
      />
    </>
  );
};
