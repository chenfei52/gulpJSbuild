$(()=>{
    $('.back-to-last').click(e=>{
        history.go(-1);
    });

    //复制卡号
    var clipboard = new ClipboardJS('.cpoy-btn');
    clipboard.on('success', function(e) {
        alert("复制成功")
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        alert("复制失败")
    });
    $(".cpoy-btn").click(function(e){
        $(this).attr("data-clipboard-text",$(".pay-no").text())
    });

    startTimeCountDown(3678)

    /**
     * 开始界面时间倒计时
     * @param times 倒计时的秒数
     */
    function startTimeCountDown(times){
        let hours = $(".countdown-container .hours");
        let minutes = $(".countdown-container .minutes");
        let seconds = $(".countdown-container .seconds");

        let timer = setInterval(()=>{
            times--;
            if(times<=0) {
                times = 0;
                clearInterval(timer);
            }
            let number = times;
            hours.html(addZero(Math.floor(times / (60 * 60))));
            number = times % (60 * 60);
            minutes.html(addZero(Math.floor(number / 60)));
            number = times % 60;
            seconds.html(addZero(number));
        }, 1000);
    }

    function addZero(n){
        if(n<10) return '0' + n;
        return n;
    }
});