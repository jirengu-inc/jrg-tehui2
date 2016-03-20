/**
 * Created by sun on 16/3/16.
 * TODO:是否必要用try,catch,return false等
 */

//预定义日期数组,如果因天气等原因而延期,可在此处修改调整后的日期
var dateArr = [
	"2016年3月20日",
	"2016年3月21日",
	"2016年3月22日",
	"2016年3月23日",
	"2016年3月24日",
	"2016年3月25日",
	"2016年3月26日",
	"2016年3月27日",
	"2016年3月28日",
	"2016年3月29日",
	"2016年3月30日",
	"2016年3月31日"
];

/* 获取数据 */

var $schools;
var $schedule;

$.getJSON("./data/game.json", function(data) {
	$schedule = data["schedule"];
	$schools = data["schools"];
	onloadShow();

	//将两个json文件合并后,只需要获取一次数据即可.保留而不是删除是因为此前没有嵌套导致$schools在执行getPrefecture()函数时还没有完成,以致页面加载有bug
	//$.getJSON("./data/school.json", function(data) {
	//	$schools = data["schools"];
	//	onloadShow();
	//});
});

/* 简单函数 */

function getPrefecture(name) {
	for (var i = 0; i < $schools.length; i++) {
		if ($schools[i]["name"] === name) {
			return $schools[i]["prefecture"];
		}
	}
}

function getScoreList(scoreArr) {
	var str = "";
	for (var $i = 0; $i < scoreArr.length; $i++) {
		str += "<td>"+scoreArr[$i]+"</td>";
	}
	var result;
	result = '<td class="name"></td>'
		+ str
		+ '<td class="final"></td>';
	return result;
}

function getDateToday() {
	var $now = new Date();
	var $year = $now.getFullYear();
	var $month = $now.getMonth() + 1;
	var $date = $now.getDate();
	return $year+"年"+$month+"月"+$date+"日";
}

function getTimeNow() {
	var $now = new Date();
	var $hour = $now.getUTCHours();
	var $gameHour = $hour + 9;
	var $minute = $now.getMinutes();
	return $gameHour + ":" + $minute;
}

function getGameId(id) {
	return id.substr(1,id.length-1);
}

function closeCard() {
	$("#card-bg").addClass("hide");
}

/* 更好的实现方法: 找到了 :D */
//function getGameInfoOrDate(id, type) {
//	for (var $i = 0; $i < $schedule.length; $i++) {
//		for (var $j = 0; $j < $schedule[$i]["games"].length; $j++) {
//			if (id === $schedule[$i]["games"][$j]["id"]) {
//				alert("i: " + $i + " j: " + $j);
//				if (type === "info") {
//					return $schedule[$i]["games"][$j];
//				} else if (type === "date") {
//					return $schedule[$i]["date"];
//				}
//			}
//		}
//	}
//}

function getGameInfoOrDate(id, type) {
	var $i = id.split("-")[0] - 1;
	var $j = id.split("-")[1] - 1;
	if (type === "info") {
		return $schedule[$i]["games"][$j];
	} else if (type === "date") {
		return $schedule[$i]["date"];
	}
}

//检查当前时间,高亮当前的比赛
//TODO: 优化
function highlightCurrentGame(){
	var $timeNow = getTimeNow();
	var $time = $(".info .time");
	if ($time.length === 1) {highlight(0)}
	if ($time.length === 2) {
		if ($timeNow < $time.eq(1).text()){
			highlight(0);
		} else if ($timeNow < "17:00") {
			highlight(1);
		}
	}
	if ($time.length === 4) {
		if ($timeNow < $time.eq(1).text()){
			highlight(0);
		} else if ($timeNow < $time.eq(2).text()) {
			highlight(1);
		} else if ($timeNow < $time.eq(3).text()) {
			highlight(2);
		} else if ($timeNow < "20:00") {
			highlight(3);
		}
	}
	if ($timeNow < $time.eq(1).text()){
		highlight(0);
	} else if ($timeNow < $time.eq(2).text()) {
		highlight(1);
	} else if ($timeNow < "19:00") {
		highlight(2);
	}
}

function highlight(idx) {
	$(".info .time").eq(idx).css("color", "#fd6a06");
	$(".scoreboard").eq(idx).toggleClass("hide");
	$(".after-game").eq(idx).toggleClass("hide");
	$(".show-more span").eq(idx).toggleClass("triangle-to-top");
	$(".show-more span").eq(idx).toggleClass("triangle-to-bottom");
}

//function toggleMore() {
//	$(this).prev().toggleClass("hide");
//	$(this).prev().prev().toggleClass("hide");
//	$(this).find("span").toggleClass("triangle-to-top");
//	$(this).find("span").toggleClass("triangle-to-bottom");
//}

function checkWidth() {
	if ($(window).width() <= 640) {
		$(".toggle-nav").removeClass("hide");
		$(".nav").addClass("hide");
	} else {
		$(".nav").removeClass("hide");
		$(".toggle-nav").addClass("hide");
	}
}

/* 大型函数?= = */

function showTodaysGame(data) {
	var $date = data["date"];
	var $gameList = $("#game-list");

	var singleGame = $('' +
		'<div class="single-game">' +
		'<div class="school-school">' +
		'<div class="info clearfix">' +
		'<div class="round-wrap">' +
		'<i class="fa fa-bullhorn"></i>' +
		'<span class="round"></span>' +
		'</div>' +
		'<div class="time-wrap">' +
		'<i class="fa fa-clock-o"></i>' +
		'<span class="time"></span>' +
		'</div>' +
		'</div>' +
		'<p class="first">' +
		'<span class="prefecture"></span>' +
		'<span class="name"></span>' +
		'<span class="final-score"></span>' +
		'</p>' +
		'<span class="vs">-</span>' +
		'<p class="third">' +
		'<span class="final-score"></span>' +
		'<span class="name"></span>' +
		'<span class="prefecture"></span>' +
		'</p>' +
		'</div>' +
		'<table class="scoreboard hide">' +
		'<tr class="home">' +
		'</tr>' +
		'<tr class="visit">' +
		'</tr>' +
		'</table>' +
		'<div class="after-game hide">' +
		'<a class="news"><i class="fa fa-link"></i>速報</a>' +
		'<a class="video"><i class="fa fa-video-camera"></i>ビデオ</a>' +
		'</div>' +
		'<div class="show-more">詳細<span class="triangle-to-bottom"></span></div>' +
		'</div><!-- .single-game -->');

	// 1/4决赛当天有4场比赛,半决赛当天2场,决赛当天1场,其他时间3场.
	// TODO: 更优雅的实现
	if($date === dateArr[8]) {
		$gameList.empty();
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
	} else if ($date === dateArr[10]) {
		$gameList.empty();
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
	} else if ($date === dateArr[11]) {
		$gameList.empty();
		singleGame.clone().appendTo($gameList);
	} else {
		$gameList.empty();
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
		singleGame.clone().appendTo($gameList);
	}

	var $games = data["games"];

	//获取当天的每场比赛数据
	for (var $idx = 0; $idx < $games.length; $idx++) {
		var $elem = $games[$idx];

		var $gameId = $elem["id"];
		var $gameRound = $elem["round"];
		var $gameTime = $elem["time"];
		var $first = $elem["first"]; //一垒侧
		var $firstPrefecture = getPrefecture($first);
		var $third = $elem["third"]; //三垒侧
		var $thirdPrefecture = getPrefecture($third);
		var $score = $elem["score"]; //最终比分: X-X
		var $finalScore = $score.split("-");
		var $fScore = $elem["fScore"]; //数组.一垒侧学校每局分数
		var $tScore = $elem["tScore"]; //数组.三垒侧学校每局分数
		var $gameNews = $elem["news"];
		var $gameVideo = $elem["video"];

		var $fScoreList = $(getScoreList($fScore)); //将每局分数封装进HTML
		var $tScoreList = $(getScoreList($tScore));

		//定位DOM元素
		var $singleGame = $(".single-game");

		var $round = $(".info .round");
		var $time = $(".info .time");

		var $fName = $(".first .name");
		var $fPrefecture = $(".first .prefecture");
		var $fFinalScore = $(".first .final-score");
		var $tPrefecture = $(".third .prefecture");
		var $tName = $(".third .name");
		var $tFinalScore = $(".third .final-score");
		//var $scoreboard = $(".scoreboard");

		//赛前决定两队先攻后攻,先攻为home,后攻为visitor
		var $scoreHome = $(".scoreboard .home");
		var $scoreVisit = $(".scoreboard .visit");

		var $video = $(".after-game .video");
		var $news = $(".after-game .news");

		var $showMore = $(".show-more");

		//填入数据
		$round.eq($idx).text($gameRound);
		$time.eq($idx).text($gameTime);
		$singleGame.eq($idx).attr("id", ("g" + $gameId));

		if ($first === "") { //未安排比赛时
			$(".vs").eq($idx).text("対戦カード未定");
			$showMore.eq($idx).addClass("hide");
		} else {
			$fName.eq($idx).text($first);
			$fPrefecture.eq($idx).text("("+$firstPrefecture+")");
			$fFinalScore.eq($idx).text($finalScore[0]);
			$tName.eq($idx).text($third);
			$tPrefecture.eq($idx).text("("+$thirdPrefecture+")");
			$tFinalScore.eq($idx).text($finalScore[1]);

			$video.eq($idx).attr("href", $gameVideo);
			$news.eq($idx).attr("href", $gameNews);

			if ($gameVideo === "") {
				$video.eq($idx).addClass("disabled");
			}

			if ($gameNews === "") {
				$news.eq($idx).addClass("disabled");
			}

			$scoreHome.eq($idx).empty();
			$scoreVisit.eq($idx).empty();

			var $isHome = $elem["firstIsHome"];

			//判断一垒侧是否先攻,先攻者在记分板上侧.
			if ($isHome) {
				$scoreHome.eq($idx).append($fScoreList);
				$scoreVisit.eq($idx).append($tScoreList);

				$(".scoreboard .home .name").eq($idx).text($first);
				$(".scoreboard .visit .name").eq($idx).text($third);

				$(".scoreboard .home .final").eq($idx).text($finalScore[0]);
				$(".scoreboard .visit .final").eq($idx).text($finalScore[1]);
			} else {
				$scoreHome.eq($idx).append($tScoreList);
				$scoreVisit.eq($idx).append($fScoreList);

				$(".scoreboard .home .final").eq($idx).text($finalScore[1]);
				$(".scoreboard .visit .final").eq($idx).text($finalScore[0]);
			}
		}
	}

	$showMore.on("click", function() {
		$(this).prev().toggleClass("hide");
		$(this).prev().prev().toggleClass("hide");
		$(this).find("span").toggleClass("triangle-to-top");
		$(this).find("span").toggleClass("triangle-to-bottom");
	});
}

function onloadShow() {
	var $today = getDateToday();
	if ($today < dateArr[0]) { //大会开赛前
		showTodaysGame($schedule[0]);
	} else if ($today == dateArr[9]) { //休养日
		showTodaysGame($schedule[9]);
	} else if ($today > dateArr[11]) { //大会结束后
		showTodaysGame($schedule[10]);
	}

	//大会进行时
	for (var $i = 0; $i < $schedule.length; $i++) {
		if ($today === $schedule[$i]["date"]) {
			var $timeTable = $("#time-table");
			//空出休养日
			if($i < 9) {
				$timeTable.find("li").eq($i).siblings().removeClass("today");
				$timeTable.find("li").eq($i).addClass("today");
			} else {
				$timeTable.find("li").eq($i+1).siblings().removeClass("today");
				$timeTable.find("li").eq($i+1).addClass("today");
			}
			showTodaysGame($schedule[$i]);
		}
	}

	highlightCurrentGame();
	checkWidth();
}

function showSingleCard(school) {
	//定位DOM元素
	var $schoolName = $("#school-name");
	var $schoolPrefecture = $("#school-prefecture");
	var $schoolCount = $("#school-count");

	var $cardContent = $("#card-content");
	$cardContent.empty();

	for (var $i = 0; $i < $schools.length; $i++) {
		if ($schools[$i]["name"] === school) {
			var $s = $schools[$i];
			//var $sArea = $s["area"];
			var $sCount = $s["count"];
			var $sPrefecture = $s["prefecture"];
			//var $sId = $s["id"];
			//TODO: 学校最终成绩的显示(比如用颜色区分在对战表上,但要注意太多颜色影响观感...)
			//var $sResult = $s["result"];

			//填充基础数据
			$schoolName.text(school);
			$schoolPrefecture.text("(" + $sPrefecture + ")");
			$schoolCount.text($sCount);

			var $sGames = $s["games"]; //数组

			for (var $j = 0; $j < $sGames.length; $j++) {
				var $sGameId = $sGames[$j];
				var $gameInfo = getGameInfoOrDate($sGameId, "info");

				var $sRound = $gameInfo["round"];
				var $sFirst = $gameInfo["first"];
				var $sThird = $gameInfo["third"];
				var $sScore = $gameInfo["score"];
				var $sRawDate = getGameInfoOrDate($sGameId, "date");
				var $sDate = "(" + $sRawDate[5] + "/" + $sRawDate[7] + $sRawDate[8] + ")";

				var cardGame = $('<tr>' +
					'<td>' +
					'<span class="round">' + $sRound + '</span>' +
					'<span class="date">' + $sDate + '</span></td>' +
					'<td>' +
					'<span class="first-name">' + $sFirst + '</span></td>' +
					'<td class="score">' +
					'<span class="first-score">' + $sScore.split("-")[0] + '</span>' +
					'<span class="vs">-</span>' +
					'<span class="third-score">' + $sScore.split("-")[1] + '</span>' +
					'</td>' +
					'<td>' +
					'<span class="third-name">' + $sThird + '</span>' +
					'</td>' +
					'<td class="result">' +
					'<a class="detail" id="' + ("s" + $sGameId) + '"><i class="triangle-to-right"></i>詳細</a>' +
					'</td>' +
					'</tr>');

				$cardContent.append(cardGame);
			}

		}
	}

	$(".detail").on("click", function() {
		var id = getGameId($(this).attr("id"));
		jumpToDetail(id);
	});
}

function jumpToDetail(id) {
	//通过id可以判断出是哪一天哪一场比赛,就不需要for循环遍历查找对应的日期了.
	var theDate = id.split("-")[0];
	var theSequence = id.split("-")[1];
	var gId = "#g" + id;
	$("#card-bg").addClass("hide");
	showTodaysGame($schedule[theDate-1]);
	//来自<关于锚点跳转及jQuery下相关操作与插件>
	//-60: 让出header占据的60px,使目标内容可以完整显示而不是被header盖住
	$("html,body").animate({scrollTop: ($(gId).offset().top-60)}, 200);
	if($(".vs").eq(theSequence-1).text() === "対戦カード未定") {
		$(".after-game").addClass("hide");
	} else {
		$(gId).find(".scoreboard").removeClass("hide");
		$(gId).find(".after-game").removeClass("hide");
		$(gId).find(".show-more span").removeClass("triangle-to-bottom");
		$(gId).find(".show-more span").addClass("triangle-to-top");
	}
}

/* 监听事件 */

$("#time-table").on("click", "li", function() {
	var $this = $(this);

	$this.siblings().removeClass("today");
	$this.addClass("today");

	if($this.index() > 9) {
		showTodaysGame($schedule[$this.index()-1]);
	} else if($this.index() < 9) {
		showTodaysGame($schedule[$this.index()]);
	}
	var $todaysDate = new Date();
	var $thisDate = $todaysDate.getDate();
	if ($thisDate == $(".today .date").text()) {
		highlightCurrentGame();
	}
});

$("#game-list").on("click", ".name", function(){
	$("#card-bg").removeClass("hide");
	showSingleCard($(this).text());
});

$("#close").on("click", closeCard);
$(".card-cover").on("click", closeCard);

$(".date-column").on("click", "li", function() {
	var id = getGameId($(this).attr("id"));
	jumpToDetail(id);
});

$(".school-column").on("click", "li", function() {
	var $name = $(this).find(".name");
	var school = $name.text();
	showSingleCard(school);
	$("#card-bg").removeClass("hide");
});

$(".toggle-nav").on("click", function() {
	$(this).prev().toggleClass("hide");
});

$(window).resize(checkWidth);