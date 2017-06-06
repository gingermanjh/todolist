(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	$(function() {
		
		//my code
		$.ajax({
			url:'./api/todos',
			datatype :'json',
			type: 'GET',
			success: function(res) {
				var list = res;
				for(var i = 0; i<list.length; i++) {
					var $li = $("<li></li>");
					var div= $("<div></div>").addClass("view");
					var input = $("<input>",{
						class : 'toggle',
						type : 'checkbox'
					});
					var label = $("<label></label").text(list[i].todo);
					var button = $("<button></button>", {
						class: 'destroy',
						id: list[i].id
					});
					if(list[i].completed == 1) {
						$li.addClass("completed");
						input.attr("checked", true);
					}
					div.append(input);
					div.append(label);
					div.append(button);
					$li.html(div);
					$(".todo-list").prepend($li);
				}
				updateCount();
			}
			
		});

	function insert(todo) {
		$.ajax({
			url:'./api/todos',
			datatype :'json',
			type: 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			data :JSON.stringify({"todo":todo}),
			success: function(res) {
				var $li = $("<li></li>");
				var div= $("<div></div>").addClass("view");
				var input = $("<input>",{
					class : 'toggle',
					type : 'checkbox'
				});
				var label = $("<label></label").text(res.todo);
				var button = $("<button></button>", {
					class: 'destroy',
					id: res.id
				});
				div.append(input);
				div.append(label);
				div.append(button);
				$li.html(div);
				$(".todo-list").prepend($li);
				updateCount();

			}
					
		});		
	}

		$(".new-todo").keydown(function(key) {
			if(key.keyCode == 13) {
				if(this.value =="") {
					alert("empty input");
				}
				else {
					insert(this.value);
					this.value = "";
				}
			}
		})

		function deleteItem(item) {
			var id = item.attr("id");
			$.ajax( {
				url: './api/todos/'+id,
				datatype: 'json',
				headers: {
					'content-Type': 'application/json'
				},
				type: 'DELETE',
				success: function() {
					item.parent().parent().remove();
					updateCount();
				}
			})
		}

		function updateCount() {
			var list = $(".todo-list").children("li");
			var count = 0;
			for(var i = 0; i<list.length; i++) {
				if(!($(list[i]).hasClass("completed"))) {
					count++;
				}
			}
			$(".todo-count").children("strong").text(count);
		}

		$(".todo-list").on("click",".destroy", function() {
			deleteItem($(this));
		});

		$(".clear-completed").click(function(){
			var list = $(".todo-list").children("li");
		
			for(var i =0; i<list.length; i++) {
				if($(list[i]).hasClass("completed")) {
					console.log($(list[i]).find(".destroy"));
					deleteItem($(list[i]).find(".destroy"));

				}
			}	
			
		});

		function updateItem(todo) {
			$.ajax( {
				url: './api/todos/'+todo.id,
				datatype: 'json',
				headers: {
					'content-Type': 'application/json'
				},
				type: 'PUT',
				data :JSON.stringify(todo),
				success: function() {
					
					updateCount();
				}
			})
		}

		$(".todo-list").on("click", ".toggle", function() {
			var todo ={};
			todo.id=$(this).parent().find(".destroy").attr("id");
			
			if($(this).parent().parent().hasClass("completed")) {
				$(this).parent().parent().removeClass();
				todo.completed=0;
			} else {
				$(this).parent().parent().addClass("completed");
				todo.completed=1;
			}
			updateItem(todo);
		});
		

		$(".filters").children("li").children("a").on("click", function() {
			
			
			if($(this).text() == "All") {
				$(this).addClass("selected");
				$(this).parent().siblings().children().removeClass();

				var list = $(".todo-list").children("li");
				for(var i = 0; i<list.length; i++) {
					$(list[i]).removeClass("hidden");
				}
			}
			else if($(this).text() == "Active") {
				$(this).addClass("selected");	
				$(this).parent().siblings().children().removeClass();

				var list = $(".todo-list").children("li");
				for(var i = 0; i<list.length; i++) {
					if($(list[i]).hasClass("completed")) {
						$(list[i]).addClass("hidden");
					}
					else {
						$(list[i]).removeClass("hidden");
					}
				}
			}
			else if($(this).text() == "Completed") {
				$(this).addClass("selected");
				$(this).parent().siblings().children().removeClass();

				var list = $(".todo-list").children("li");
				for(var i = 0; i<list.length; i++) {
					if(!($(list[i]).hasClass("completed"))) {
						$(list[i]).addClass("hidden");
					}
					else {
						$(list[i]).removeClass("hidden");
					}
				}
			}
		});
	
	});


})(window);
