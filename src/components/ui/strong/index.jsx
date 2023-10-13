import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import bold from "../../../assets/bold.ttf";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
function Strong() {
  return <Text>Strong</Text>;
}

export default Strong;
