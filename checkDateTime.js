

const enableContestStart = (contestStartTime, contestStartDate) => {
    // Choose Date and Time Format Yourself.
    const z = contestStartDate + '-' + contestStartTime;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMin();
    let sec = today.getSeconds();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + '-' + mm + '-' + dd + '-' + hh + ':' + min;
    return today == z;


}
module.exports = { enableContestStart };