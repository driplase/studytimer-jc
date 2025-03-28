const main = document.getElementById('main');
const study = document.getElementById('study');
const sum = document.getElementById('sum');
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const status = document.getElementById('status');
const meigen = document.getElementById('meigen');
const meigenlist = [
    "誘惑に負けた1時間で、ライバルは前に進んでいる。",
    "勉強で勝つ者は、最後に笑う者だ。",
    "成長した自分に出会いたいなら、勉強をやめるな。",
    "勝ち負けの結果よりも、成長の過程が大切だ。",
    "勝つために必要なのは、常に成長し続ける意志だ。",
    "勝ち負けは結果。でも、勉強は自分を強くする手段だ。",
];



const date = new Date();
const dateid = date.getMonth() + " " + date.getDate() + " " + date.getFullYear();
if (!localStorage.getItem(dateid)) {
    localStorage.setItem(dateid, 0);
}

let sumtime = parseInt(localStorage.getItem(dateid));

let counttime = 0, timerInterval, startedTime, breakStart;

shokika();
function shokika(){

    let random = Math.floor(Math.random() * 6);
    meigen.innerText = meigenlist[random];
    main.style.display = 'block';
    study.style.display = 'none';
    let hour = Math.floor(sumtime / 3600);
    let min = Math.floor(sumtime % 3600 /60);
    let sec = sumtime % 60;
    sum.innerText = String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

    timerInterval = undefined;
    startedTime = undefined, breakStart = undefined;

}
const sound = new Audio('決定ボタンを押す4.mp3');



stop.addEventListener('click', () => {
    sumtime += counttime;
    localStorage.setItem(dateid, sumtime);
    if (timerInterval) clearInterval(timerInterval);
    if (document.exitFullscreen) document.exitFullscreen()
    shokika();
});

start.addEventListener('click', () => {
    counttime = 0;
    startedTime = Date.now();

    main.style.display = 'none';
    study.style.display = 'block';

    studyfunc();

    function studyfunc() {
        document.documentElement.requestFullscreen();

        status.innerText = '学習中';
        let studytime = 25 * 60;

        let min = Math.floor(studytime / 60);
        let sec = studytime % 60;
        timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

        timerInterval = setInterval(() => {
            const timerValue = startedTime + studytime - Date.now() / 1e3;
            counttime += studytime - timerValue;
            let min = Math.floor(timerValue / 60);
            let sec = Math.floor(timerValue % 60);
            timer.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
            if (timerValue <= 0) {
                clearInterval(timerInterval);
                breakfunc();
                return;
            }
        });
    }

    function breakfunc() {
        sound.pause(), sound.currentTime = 0
        sound.play();
        status.innerText = '休憩中';

        let breaktime = 5 * 60;

        breakStart = Date.now() / 1e3;

        let min = Math.floor(breaktime / 60);
        let sec = breaktime % 60;
        timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

        timerInterval = setInterval(() => {
            const timerValue = breakStart + breaktime - Date.now() / 1e3;
            counttime += breaktime - timerValue;
            const min = Math.floor(timerValue / 60);
            const sec = Math.floor(timerValue % 60);
            timer.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
            if (timerValue <= 0) {
                clearInterval(timerInterval);
                sound.pause(), sound.currentTime = 0
                sound.play();
                studyfunc();
                return;
            }
        });
    }
});
