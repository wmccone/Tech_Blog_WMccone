module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
    check_user: (postUser, currentUser) => {
      if(postUser==currentUser){
        return true
      }
      else{
        return false
      }
    }
  };