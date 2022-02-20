export default class Alert{
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
        
    function getAlertData(key)
    {
        console.log(localStorage.getItem(key));
        console.log(JSON.parse(localStorage.getItem(key)));
        return JSON.parse(localStorage.getItem(key));
    }
}
}