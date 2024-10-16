class StringUtil {
    getNameStatus = (id) => {
      return id?.toString() === "0" ? "Disable" : "Active";
    };
  
    dateFormatShow = "DD-MM-YYYY";
    dateFormatToSever = "YYYY-MM-DD";
  
  
    safeParseJSON(maybeJson) {
      try {
        return JSON.parse(maybeJson);
      } catch (e) {
        return maybeJson;
      }
    }
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default new StringUtil();
  