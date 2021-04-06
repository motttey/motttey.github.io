let selected_indexes = [];
let init_data, output_data;

const api_url = 'https://mochiduko-api.netlify.app/';

const total_illust_num = [
	{"name": "tagged \n ‘doraemon’", "num": 989},
	{"name": "tagged \n  ‘doraemon’", "num": 24042}
];

const width = 660;
const height = 300;
const margin = 50;

function sortObjectByKey(array, key) {
	array.sort(function(a, b) {
    return (a[key] > b[key]) ? -1 : 1;
  });
	return array;
}

function showPrimaryStats(stat_data){
	Object.entries(stat_data).forEach(function(stat){
		let num = 0;
		setInterval(function(){
			if (num <= stat[1]){
				$('#' + stat[0]).html(stat[0] + ": " + num);
				num = num + parseInt(stat[1]/100);
			} else {
				$('#' + stat[0]).html(stat[0] + ": " + stat[1]);
			}
		},1);
	});
}

$(document).ready( function(){
	$('img').on('inview', function(event, isInView) {
	  if (isInView) {
	    $(this).addClass('zoomIn');
	  } else {
			$(this).removeClass('zoomIn');
			// $(this).css('opacity',0);
		}
	});

	$('.each_stats, #stat_svg_outer').on('inview', function(event, isInView) {
	  if (isInView) {
	    $(this).addClass('slideTop');
	  } else {
			$(this).removeClass('slideTop');
			// $(this).css('opacity',0);
		}
	});

	$('li').on('inview', function(event, isInView) {
	  if (isInView) {
	    $(this).addClass('slideLeft');
	  } else {
			$(this).removeClass('slideLeft');
			// $(this).css('opacity',0);
		}
	});

	$.getJSON("output.json", function(data) {
		init_data = data;
		output_data = data;

		const DefaultIllustNum = 12;
		$('#search-mode .item')
		 .on('click', function(d) {
				$(this).addClass('active').siblings('.item').removeClass('active');
				$('div.card').remove();
				output_data = setSortTargetKey($(this).attr('id'), init_data);
				viewIllust(0, DefaultIllustNum, output_data);
		});

		$('#RandomImageViewButton')
		 .on('click', function(d) {
			 viewIllustOnButtonClick(output_data);
		});

		$('#search-keywords').keypress( function (e) {
			if ( e.which == 13 ) {
				let queries = $('#search-keywords input').val().split(/\s+/)
				const queries_length = queries.length
				output_data = [];
				selected_indexes = [];

				// クエリの表記揺れに対応
				// 0件の時の表示検討
				data.forEach(function(illust, index){
					let matched_count = 0;
					let queries_found = {};
					illust["tags"].forEach(function(tag){
						queries.forEach(function(query){
							if (tag["name"].indexOf(query) != -1　&& query in queries_found === false) {
								queries_found[query] = true;
								matched_count++;
							}
						});
					});

					if (matched_count >= queries_length) output_data.push(illust);
				});

				// console.log(output_data);
				$('div.card').remove();
				const max = (output_data.length > DefaultIllustNum)? 16 :output_data.length;
				viewIllust(0, max, output_data);
			}
		});

		viewIllust(0, DefaultIllustNum, output_data);
		controlVisibleOfButton(output_data.length, DefaultIllustNum)
		initializeSVG();

		fetch(api_url + 'total_stat.json')
			.then((response) => response.json())
			.then((data) => {
				showPrimaryStats(data);
			});

		fetch(api_url + 'each_years.json')
			.then((response) => response.json())
			.then((data) => {
				drawStatGraphs(data.reverse());
			});
	});
});

function controlVisibleOfButton(data_length, start){
	if (data_length > start + 4) {
		$('#RandomImageViewButton').show();
	} else {
		$('#RandomImageViewButton').hide();
	}
}

function setSortTargetKey(id, data){
	selected_indexes = [];
	switch (id){
		case 's-random':
			break;
		case 's-bookmark':
			data = sortObjectByKey(data, 'bookmark')
			break;
		case 's-view':
			data = sortObjectByKey(data, 'view')
			break;
		case 's-comments':
			data = sortObjectByKey(data, 'comments')
			break;
	}
	return data;
}

function viewIllustOnButtonClick(data){
	let existin_illust_num = $('div.card').length;
	const illust_num = (data.length > 4)? 4 : data.length;
	viewIllust(existin_illust_num, illust_num, data);
}

function viewIllust(start, NUM, data) {
	for(let i = start; i < start + NUM; i++){
		getRandomIllust(data, i);
	}
	controlVisibleOfButton(data.length, start + NUM);
}

function resizeImageHeight(id){
	let CardWidth = $("#" + id).width();
	let Cardheight = $("#" + id).height();
	let image = $("#" + id + " img");
	if (image.height() < image.width() ) {
		// $("#" + id).css("margin-top", (image.width() - image.height())/2)
	}
}

function getRandomNumber(max, min){
	let randomNumber = parseInt(Math.random() * (max - min) + min);
	while(selected_indexes.includes(randomNumber)){
		randomNumber = parseInt(Math.random() * (max - min) + min);
	}
	selected_indexes.push(randomNumber);
	return randomNumber;
}

function getRandomIllust(data, index){
	const max = data.length;	//トータルの投稿数に置換
	const min = 0;
	const ViewIllustNum = 1;
	const randomNumber = getRandomNumber(max, min);

	let target_data = ($('#s-random').hasClass('active'))? data[randomNumber] : data[index];
	let photo = "http://embed.pixiv.net/decorate.php?illust_id=" + target_data["id"] + "&mode=sns-automator";
	let url = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + target_data["id"];
	let id = "i" + target_data["id"];
	$('div.cards').append('  <div class="card" id="'+id+'"><div class="image"><a href="' + url + '" target="_blank"><img class="thumb-image" src="' + photo + '" \/><\/a><\/div>');
}

function initializeSVG(){
	let bar_g = d3.select("#stat_svg").append("svg").append("g")
			.attr("id", "bar_g")
			.attr("width", width + margin)
			.attr("height", height)
	    .attr("transform", "translate(" + 0 + "," + 0 + ")");

	let pie_g = d3.select("#stat_svg").append("svg").append("g")
			.attr("id", "pie_g")
			.attr("width", width + margin)
			.attr("height", height)
	    .attr("transform", "translate(" + width/2 + "," + height*2 + ")");
}

function drawStatGraphs(illust_num){
	let x_bar_scale = d3.scaleBand().rangeRound([margin, width - margin]).padding(0.1);
  let y_bar_scale = d3.scaleLinear().rangeRound([height, margin]);

	x_bar_scale.domain(illust_num.map(function(d) { return d["year"]; }));
  y_bar_scale.domain([0, d3.max(illust_num, function(d) { return d["illust_num"]; })]);

	let bar_g = d3.select("#bar_g");

  bar_g.append("g")
      .attr("class", "axis bar_axis-x")
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x_bar_scale));

  bar_g.append("g")
      .attr("class", "axis bar_axis-y")
			.attr("transform", "translate(" + margin + "," + 0 + ")")
      .call(d3.axisLeft(y_bar_scale))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency")
			.style("font-color", "white");

  bar_g.selectAll(".bar")
    .data(illust_num)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_bar_scale(d["year"]); })
      .attr("y", function(d) { return y_bar_scale(d["illust_num"]); })
			.attr("fill", "white")
      .attr("width", x_bar_scale.bandwidth())
      .attr("height", function(d) { return height - y_bar_scale(d["illust_num"]); });

	const pie_width = 280;
  const	pie_height = 280;
	const pie_radius = pie_width / 2;

	let pie = d3.pie()
		.sort(null)
		.value(function(d) {
			return d["num"];
		});

	let arc = d3.arc()
		.outerRadius(pie_radius * 0.8)
		.innerRadius(pie_radius * 0.4);

	let outerArc = d3.arc()
		.innerRadius(pie_radius * 0.9)
		.outerRadius(pie_radius * 0.9);

	let pie_g = d3.select("#pie_g");

	let pie_slices = pie_g.append("g")
		.attr("class", "slices");
	let pie_labels = pie_g.append("g")
		.attr("class", "labels");
	let pie_lines = pie_g.append("g")
		.attr("class", "lines");

	let pie_arcs = pie_slices.selectAll(".arc")
	    .data(pie(total_illust_num))
	    .enter().append("g")
	      .attr("class", "arc");

	pie_arcs.append("path")
	      .attr("d", arc)
	      .attr("fill", function(d, i) { return (i==0)? "white": "none" })
				.attr("stroke", "white");

	let pie_text = pie_labels.selectAll("text")
		.data(pie(total_illust_num))
		.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data["name"];
		})
    .attr("transform", function(d, i) {
			let pos = outerArc.centroid(d);
			let margin = (i%2 === 0)? -1 * 2 * pie_radius: 0.8 * pie_radius;
			pos[0] = pos[0] + margin;
			return "translate(" + pos  + ")";
		});

	let pie_polyline = pie_lines.selectAll("polyline")
			.data(pie(total_illust_num))
			.enter()
			.append("polyline")
			.attr("points", function(d, i){
					let pos = outerArc.centroid(d);
					let margin = (i%2 === 0)? -1 : 1;
					pos[0] = pie_radius * 0.5 * margin;
					return [arc.centroid(d), outerArc.centroid(d), pos];
			})
			.style("fill", "none")
			.style("stroke", "white");

	let pie_title_text = pie_g.append("svg:text")
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.attr("style","font-family:Passion One")
			.attr("font-size","40")
			.attr("fill","#fff")
			.text("parsentage of illists");
}
