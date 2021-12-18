/**
 * read the json file using d3
 */
let data = d3.json("data/samples.json").then((rawData) => {
    /**
     * create var for name and load that data into the <select>
     */
    function loadNames(names) {
        for (let i = 0; i < names.length; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = names[i];
            document.getElementById('selDataset').appendChild(opt);
        };
    };

    /**
     * initial load ins for the page
     */
    // load the names into the page.
    loadNames(rawData.names);
    //load meta-data
    loadMetaData();
    //create the hbar chart
    createBar(document.getElementById('selDataset').value);
    //load bubble chart
    createBubble(document.getElementById('selDataset').value);

    /**
     * when a name is selected update the page with the new data
     */
    document.getElementById('selDataset').onchange = function optionChanged() {
        // re-load the meta-data
        loadMetaData();
        // re-load the bar chart
        createBar(document.getElementById('selDataset').value);
        // re-load the bubble chart
        createBubble(document.getElementById('selDataset').value);
    };

    /**
     * Update the meta-data
     */
    function loadMetaData() {
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
    };

    /**
     * Generate hotizontal bar chart
     */
    function createBar(index) {
        /**
         * find the top ten bacterias in the samples and create the bar chart
         */
        let sample = rawData.samples[index];
        let xAxis = sample.sample_values;
        let yAxis = [];
        let hoverText = sample.otu_labels;
        for (let i = 0; i < sample.otu_ids.length; i++) {
            yAxis.push("OTU " + sample.otu_ids[i])
        };
        // create the horizontal bar chart
        let hBar = [{
            type: 'bar',
            x: xAxis.slice(0, 9).reverse(),
            y: yAxis.slice(0, 9).reverse(),
            orientation: 'h',
            text: hoverText.slice(0, 9).reverse()
        }];
        let layout = {
            showlegend: false
        };
        Plotly.newPlot("bar", hBar, layout);
    };

    /**
    * create the bubble chart
    */
    function createBubble(index) {
        /**
        * create the bubble chart
        */
        let sample = rawData.samples[index];
        let bubble = {
            // TODO: update the bubble logic
        };
        let layout = {
            showlegend: false
        };
        Plotly.newPlot('bubble', bubble, layout);
    };
});