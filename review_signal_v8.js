// Dump from deltoid for markdown
'use strict';

let url = null;
let data = '---data---';

let share_button = document.querySelector('[aria-label="Share"]');
let exp_info = document.querySelector('[aria-label="experiment and query information"]');

const metricSettingUpdate = ((index) => {
  	// console.log('metricSettingUpdate');
  	document.querySelector('._64oj').firstChild.click();
    let settingTable = document.querySelector('._422k').children;
    let row = settingTable[index].querySelector('[role=button]');
    row.click();

});

const dataGetter = (() => {
    // const url = prompt('Please enter deltoid URL');
    let subtitle;
    let subSectionLabel;

    function round(val) {
        const digits = Math.pow(10, 2);
        return Math.round(val * digits) / digits;
    }

    //     url = document.querySelector('._5v-0._53il').firstElementChild.innerText.split('\n')[1];
    //     url = document.querySelector('._2phz').innerText.match('[\n](.*)[\n]')[1];
    //     url = document.querySelector('._5v-0._53il').querySelector('._2phz').querySelectorAll('span')[1].innerText;
    //     if (url == null){
    url = document.querySelector('._5v-0._53il ._53ij ._2phz ').querySelectorAll('a')[0].innerText;
    //     }
    // console.log(document.querySelector('._5v-0._53il').firstElementChild);
    console.log('getting url..');
    share_button.click();

    if (url == null) {
        console.log('getting url...');

        let div_count = document.querySelectorAll('._2phz').length;
        let now = new Date().getTime();
        const UrlIntervalId = setInterval(() => {
            url = document.querySelectorAll('._2phz')[div_count - 1].innerText.match('[\n](.*)[\n]')[1];
            console.log('Fetching URL (Incomplete)..');
            if (url !== null || new Date().getTime() - now > 30000) {

                clearInterval(UrlIntervalId);
            }
        }, 500);

        // url = prompt('Please enter deltoid URL');
        // throw new Error('No url found');
    }

    const metadata = Array.from(
        document.querySelectorAll('._lkn')[1].querySelectorAll('tr'),
    ).map(e => {
        const [first, ...rest] = e.innerText.split(':');
        const remainder = rest.join(':');
        return [first.trim(), remainder];
    });

    const date = metadata.find(([key, _]) => key.match('Time Range'))[1];

    const metricInfo = metadata.find(([key, _]) =>
        key.match('MDF Metrics|MDF Tags'),
    );
    const metrics = metricInfo[1].split(', ');

    let collectionName;
    if (metrics.length > 1) {
        collectionName = `${metrics[0]} and ${metrics.length - 1} ${
      metrics.length === 2 ? 'other' : 'others'
    }`;
    } else {
        collectionName = metrics.join(', ');
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.custom_label != null) {
        collectionName = urlParams.custom_label;
    }
    // console.log('collectionName');
    // console.log(collectionName);
    if (collectionName == null) {
        throw new Error('No collection found');
    }

    const filter = metadata.find(([key, _]) => key.match('Filters'));

    const rows =
        document.querySelector('[aria-label=grid]')?.querySelectorAll('._af1s') ?? [];

    if (rows.length === 0) {
        throw new Error('No rows found');
    }

    if (date == null || date === '') {
        throw new Error('No date found');
    }

    const subtitleEntryCount = new Map();
    let lastSubtitle = null;

    const outcomes = [].slice
        .call(rows)
        .map(e => {
            const diffAllElement = e.querySelector('._1c1_');
            const textComponents = e.innerText.split('\n');

            // const isSubtitle = textComponents.length === 1;
      
            const isSubtitle = e.querySelector('._af22').querySelector('._af1v') == null;
            const titleText = e.querySelector('._af23');
          
            if (titleText == null) {
                throw new Error('No titleText found');
            }
            if (isSubtitle) {

                subtitle = titleText.innerText.split(', ')[0];
                subSectionLabel = titleText.innerText.split(', ')[1];

                subtitleEntryCount.set(subtitle, 0);
                lastSubtitle = subtitle;

                return {
                    key: subtitle,
                    label: `- ${subtitle}`,
                    type: 'subtitle'
                };
            }
            //const useSubtitle = e.querySelector('._3462._1iu_') != null;
            const useSubtitle = e.querySelector('._af22._af24') != null; // border left
          
            // console.log(textComponents);
          	// console.log(isSubtitle);
          	// console.log(useSubtitle);
            if (diffAllElement == null) {
                console.log('error on', e);

                return null;
            }

            const diffAll = diffAllElement.innerText
                .split(/\n|±/)
                .map(v => parseFloat(v));
            // console.log(diffAll);
            const value = diffAll[0];
            const plus = diffAll[1];
            const minus = Math.abs(diffAll[2] ?? diffAll[1]);

            const isNeutral =
                (value + plus >= 0 && value - minus <= 0) ||
                (value + plus <= 0 && value - minus >= 0);
            if (isNeutral && !window.showNeutral) {
                return null;
            }

            if (useSubtitle) {
                subtitleEntryCount.set(
                    lastSubtitle,
                    subtitleEntryCount.get(lastSubtitle) + 1,
                );
            }

            const string = useSubtitle ? ['     -'] : ['-'];

            //             const isPositiveOutcome = e.querySelector('._g50') != null;
            const isPositiveOutcome = e.querySelector('._af1x._adwv') != null;

            if (!isNeutral) {
                string.push(
                    isPositiveOutcome ?
                    String.fromCodePoint(0x1f7e9) :
                    String.fromCodePoint(0x1f7e5),
                );
            }

            if (useSubtitle) {
                string.push(`${subSectionLabel}:`);
            }

            const label = titleText.innerText;
            //  console.log(label);

            string.push(`${label}:`);
            const stringVal = value > 0 ? `+${round(value)}` : `${round(value)}`;
            string.push(isNeutral ? 'Neutral' : stringVal + '%');

            if (!isNeutral && window.showCI) {
                if (plus === minus) {
                    string.push(`(±${round(plus)})`);
                } else {
                    string.push(`(+${round(plus)}-${round(minus)})`);
                }
            }
            if (["cpu", "time", "average", "avg", "queries", "latency"].filter(item => label.toLowerCase().includes(item)).length > 0) {
                metricSettingUpdate(1);
                const diffAllElement2 = e.querySelector('._1c1_');
                const diffAll2 = diffAllElement2.innerText
                    .split(/\n|±/)
                    .map(v => parseFloat(v));
                // console.log(diffAll);
                const value2 = diffAll2[0];
                string.push(`(Delta: ${round(value2)})`);

                metricSettingUpdate(0);
            }

            return {
                label: string.join(' ')
            };
        })
        .filter(val => {
            return (
                val != null &&
                (val?.key == null || subtitleEntryCount.get(val?.key) > 0)
            );
        });

    if (outcomes.length === 0) {
        outcomes.push({
            label: '- Neutral'
        });
    }

    if (filter != null) {
        outcomes.unshift({
            label: `_Filter: ${filter.slice(1).join(', ')}_`
        });
    }

    data = [`### [${collectionName.trim()} (${date.trim()})](${url})`]
        .concat(outcomes.map(({
            label
        }) => label))
        .join('\n');
});



/* Copy the text  */

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '12px';
    el.style.width = '1000px';
    el.style.height = '170px';
    let exp_info = document.querySelector('[aria-label="experiment and query information"]');

    exp_info.appendChild(el);
    el.style.zIndex = 4;
    el.style.top = '100px';
    el.select();
    document.execCommand('copy');
    exp_info.click();
    //     document.body.removeChild(el);
};

let complete = false;
let query_button = document.querySelector('[aria-label="Run Query"]');
query_button.click();

setTimeout(() => {
    const intervalId = setInterval(() => {
        complete = document.getElementById('d3MainVizContainer').querySelectorAll('._yyt')[1].innerText == 'Query Results (100%)';
        console.log('Running (Incomplete)..');
        if (complete == true) {

            exp_info.click();
            share_button.click();


            setTimeout(dataGetter, 1000);

            setTimeout(() => {
                let share_button = document.querySelector('[aria-label="Share"]');
                let exp_info = document.querySelector('[aria-label="experiment and query information"]');
                console.log(data);
                console.log(url);
                copyToClipboard(data);

                share_button.click();
                // exp_info.click();

            }, 1200);
            clearInterval(intervalId);
        }
    }, 500);
}, 5000);
