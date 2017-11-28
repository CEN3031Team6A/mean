// rules: all question titles must be unique, there can be only one answer leading to a new question

$(document).ready(function () {
	var database = firebase.database();
	database.ref('tree').on("value", closure)

	$.getJSON("data.json", function (d) {
		renderClosure(d);
	});
	function renderResources(resource) {
		var popup =
			"<div id='popup'>" +
			"<h2>" +
			resource.resourceTitle +
			"</h2>" +
			"<p>" +
			resource.resourceParagraph +
			"</p><h3>Resources</h3>";
		for (var i = 0; i < resource.resourceLinks.length; i++) {
			popup +=
				"<a target='_blank' href='" +
				resource.resourceLinks[i].url +
				"'>" +
				resource.resourceLinks[i].linkName +
				"</a>";
		}
		popup +=
			"<div id='close_btn' class='close_button noselect'>Close</div></div>";
		var $popup = $(popup);
		var $wrapper = $("#wrap");
		var $footerLine = $("#footer_line");
		var $footer = $("footer");
		$wrapper.css({ filter: "blur(3px)" });
		$footerLine.css({ filter: "blur(3px)" });
		$footer.css({ filter: "blur(3px)" });
		$popup.css({ filter: "blur(0px)" });

		var removePopup = function () {
			$popup.remove();
			$footerLine.css({ filter: "blur(0px)" });
			$footer.css({ filter: "blur(0px)" });
			$wrapper.css({ filter: "blur(0px)" });
		};

		$popup.find("#close_btn").on("click", removePopup);
		$("body").append($popup);
	}
	function closure(snapshot){
		var tree = snapshot.val();
		console.log(tree);
		var i = -1;
		function render(){
			i++;
			var $question = $("#question");
			var $h2 = $question.find("h2");
			var $p = $question.find("p");
			var $buttons = $question.find("#buttons");

			$h2.text(tree[i].questionTitle);
			$p.text(tree[i].questionParagraph);

			var props = [];
			for (var j = 0; j < tree[i].answers.length; j++) {
				props.push(tree[i].answers[j]);
			}
			console.log(props);
			$buttons.empty();
			//debugger;
			for (var l = 0; l < props.length; l++) {
				console.log(props[l]);
				button =
					"<div class='answer_button noselect'>" +
					tree[i].answers[l].answerTitle +
					"</div>";
				$button = $(button);
				if (props[l].nextBool == false) {
					$buttons.on("click", render)
				} else {
					$button.on("click", renderResources.bind(null, props[l]))
				}
				$buttons.append($button);
			}
		}
		render();
	}
});

// 	function renderClosure(d) {
// 		function renderResources(resource) {
// 			var popup =
// 				"<div id='popup'>" +
// 				"<h2>" +
// 				resource.resourceTitle +
// 				"</h2>" +
// 				"<p>" +
// 				resource.resourceParagraph +
// 				"</p><h3>Resources</h3>";
// 			for (var i = 0; i < resource.resourceLinks.length; i++) {
// 				popup +=
// 					"<a target='_blank' href='" +
// 					resource.resourceLinks[i].url +
// 					"'>" +
// 					resource.resourceLinks[i].linkName +
// 					"</a>";
// 			}
// 			popup +=
// 				"<div id='close_btn' class='close_button noselect'>Close</div></div>";
// 			var $popup = $(popup);
// 			var $wrapper = $("#wrap");
// 			var $footerLine = $("#footer_line");
// 			var $footer = $("footer");
// 			$wrapper.css({ filter: "blur(3px)" });
// 			$footerLine.css({ filter: "blur(3px)" });
// 			$footer.css({ filter: "blur(3px)" });
// 			$popup.css({ filter: "blur(0px)" });

// 			var removePopup = function() {
// 				$popup.remove();
// 				$footerLine.css({ filter: "blur(0px)" });
// 				$footer.css({ filter: "blur(0px)" });
// 				$wrapper.css({ filter: "blur(0px)" });
// 			};

// 			$popup.find("#close_btn").on("click", removePopup);
// 			$("body").append($popup);
// 		}

// 		function renderBreadCrumbsUtil(breadCrumbs) {
// 			$breadCrumbs = $("#bread_crumbs");
// 			$breadCrumbs.empty();
// 			for (var i = 0; i < breadCrumbs.length; i++) {
// 				var link =
// 					"<div class='bread_crumb'>" +
// 					breadCrumbs[i].questionTitle +
// 					"</div>";
// 				var $link = $(link);

// 				$link.on("click", render.bind(null, breadCrumbs[i]));
// 				$breadCrumbs.append($link);
// 				$breadCrumbs.append(
// 					$("<p style='display: inline-block'> &nbsp; >> &nbsp;</p>")
// 				);
// 			}
// 		}

// 		function renderBreadCrumbs(questionTitle) {
// 			var breadCrumbs = [];
// 			var itter = d.question;
// 			while (true) {
// 				if (itter.questionTitle == questionTitle) {
// 					breadCrumbs.push(itter);
// 					break;
// 				} else {
// 					breadCrumbs.push(itter);
// 					for (answer in itter.answers) {
// 						var a = answer;
// 						if (itter.answers[answer].question != null) {
// 							itter = itter.answers[answer].question;
// 							break;
// 						}
// 					}
// 				}
// 			}
// 			renderBreadCrumbsUtil(breadCrumbs);
// 		}

// 		function render(question) {
// 			var $question = $("#question");
// 			var $h2 = $question.find("h2");
// 			var $p = $question.find("p");
// 			var $buttons = $question.find("#buttons");

// 			$h2.text(question.questionTitle);
// 			$p.text(question.questionParagraph);

// 			var props = [];

// 			for (q in question.answers) {
// 				props.push(q);
// 			}
// 			$buttons.empty();
// 			for (var i = 0; i < props.length; i++) {
// 				button =
// 					"<div class='answer_button noselect'>" +
// 					props[i] +
// 					"</div>";
// 				$button = $(button);
// 				if (question.answers[props[i]].question != null) {
// 					$button.on(
// 						"click",
// 						render.bind(null, question.answers[props[i]].question)
// 					);
// 				} else {
// 					$button.on(
// 						"click",
// 						renderResources.bind(null, question.answers[props[i]])
// 					);
// 				}
// 				$buttons.append($button);
// 			}
// 			renderBreadCrumbs(question.questionTitle);
// 		}

// 		render(d.question);
// 	}
// });
