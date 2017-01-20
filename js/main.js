$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let username = e.target.value;
        $.ajax({
            url: 'http://api.github.com/users/' + username,
            data: {
                client_id: '2bed2f07d53f1cec2250',
                client_secret: '5af0ef1ca2b72cd46b089e623a511d9e5efe30f9'
            }
        }).done(function(user) {
            $.ajax({
                url: 'http://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '2bed2f07d53f1cec2250',
                    client_secret: '5af0ef1ca2b72cd46b089e623a511d9e5efe30f9',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos) {
                //console.log(repos)
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                		<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3">
									<span class="label label-success">Forks: ${repo.forks_count}</span>
									<span class="label label-success">Watchers: ${repo.watchers_count}</span>
									<span class="label label-info">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
								</div>
							</div>
                		</div>
                		`);
                });
            });
            //console.log(user)
            $('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
						<div class="col-md-3">
							<img src="${user.avatar_url}" class="thumbnail avatar">
							<a href="${user.html_url}" target="_blank" class="btn btn-block btn-primary">View Profile</a>
						</div>
						<div class="col-md-9">
							<span class="label label-success">Followers: ${user.followers}</span>
							<span class="label label-success">Following: ${user.following}</span>
							<span class="label label-info">Repos: ${user.public_repos}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Email: ${user.email}</li>
								<li class="list-group-item">Bio: ${user.bio}</li>
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">User Since: ${user.created_at}</li> 
							</ul>
						</div>
				    </div>
				  </div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos">
				</div>
            	`);
        });
    });
});
