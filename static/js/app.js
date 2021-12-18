/**
 * read the json file using d3
 */
let data = d3.json("data/samples.json").then((rawData) => {
    /**
     * create var for name and load that data into the <select>
     */
    let names = rawData.names;
    function loadNames() {
        for (let i = 0; i < names.length; i++) {
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
    document.getElementById('selDataset').onchange = function optionChanged() {
        /**
         * locate the selected index
         * */
        let index = document.getElementById('selDataset').value;

        // generate key-value pair from the metadata using the index and add it
        //     to the associated metadata div
        document.getElementById('sample-metadata').innerHTML = "";
        for (const [key, value] of Object.entries(rawData.metadata[index])) {
            let str = document.createElement('h5')
            str.innerHTML = `${key}: ${value}`
            document.getElementById('sample-metadata').appendChild(str);
        };

        /**
         * find the top ten bacterias in the samples and create the bar chart
         */
        let sample = rawData.samples[index];
        let xAxis = [];
        let yAxis = [];
        let hoverText = [];
        for (let i = 0; i < 10; i++) {
            yAxis.push("OTU " + sample.otu_ids[i])
            xAxis.push(sample.sample_values[i]);
            hoverText.push(sample.otu_labels[i]);
        };
        // create the horizontal bar chart
        let hBar = [{
            type: 'bar',
            x: xAxis.reverse(),
            y: yAxis.reverse(),
            orientation: 'h',
            text: hoverText
        }];
        Plotly.newPlot("bar", hBar);
    };
});