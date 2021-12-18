/**
 * read the json file using d3
 */
 let data = d3.json("data/samples.json").then((rawData) => {
    /**
     * create var for name and load that data into the <select>
     */
    let names = rawData.names;
    function loadNames(){
        for(let i = 0; i<names.length; i++){
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = names[i];
            document.getElementById('selDataset').appendChild(opt);
        };
    };
    loadNames();

    /**
     * when a name is selected update the page with the new data
     */
     document.getElementById('selDataset').onchange = function optionChanged(){
        let index = document.getElementById('selDataset').value;
        console.log(index);
        let y = document.getElementById('selDataset')[x].innerHTML;
        console.log(y);
     };
});