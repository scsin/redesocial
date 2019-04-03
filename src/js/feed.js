window.onload = () => {

  event.preventDefault();
  // Get a reference to the database service
  const database = firebase.database();
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  let likes = 0;

  firebase.database().ref('feed/posts').once('value').then(snapshot => {
    snapshot.forEach(value => {
      var childkey = value.key;
      var childData = value.val();
      let firebaseDate = childData.date;
      let firebaseText = childData.text;
      postTemplate(firebaseDate, firebaseText, childkey);
    })
  })

  // data e hora do post
  function getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let time = Date().split(' ')[4];

    let postDate = `${day}/${month}/${year} - ${time}`
    return postDate;
  };

  function getText() {
    return $('#comment-text').val();
  }

  const postTemplate = function (date, textPost, key) {
    // cabeçaho do post
    let name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerText = '@user';

    let header = document.createElement('span');
    header.setAttribute('class', 'date-time');
    header.innerText = date;

    // mensagem
    let text = document.createElement('p');
    text.setAttribute('class', 'text-post');
    text.innerText = textPost;

    // editar postagem
    const editPost = document.createElement('button');
    editPost.setAttribute('class', 'post-btn');
    editPost.setAttribute('class', 'far fa-edit btn btn-default navbar-btn');
    editPost.innerText = '';

    // excluir postagem
    const deletePost = document.createElement('button');
    deletePost.setAttribute('class', 'post-btn');
    deletePost.setAttribute('id', 'delete-btn');
    deletePost.setAttribute('class', 'far fa-trash-alt btn btn-default navbar-btn');
    deletePost.setAttribute('data-id', key);
    deletePost.innerText = '';

    // botão curtir
    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('id', 'like-btn');
    likeBtn.setAttribute('class', 'far fa-thumbs-up btn btn-default navbar-btn');
    likeBtn.innerText = '';

    // contador de curtidas
    const counter = document.createElement('span');
    counter.setAttribute('id', 'show-likes');
    counter.setAttribute('class', 'show-likes');
    counter.innerHTML = 0 + ' curtidas';

    // card de postagem
    const card = document.createElement('div');
    card.setAttribute('class', 'post-card');
    card.setAttribute('id', 'post-card');

    // inserir informações no card
    card.appendChild(name);
    card.appendChild(header);
    card.appendChild(text);
    card.appendChild(editPost);
    card.appendChild(deletePost);
    card.appendChild(likeBtn);
    card.appendChild(counter);

    // adiciona nos posts
    postsContainer.insertBefore(card, postsContainer.childNodes[0]);
  }

  $('#post-btn').click(function publishPost() {
    let newPost = {
      text: getText(),
      date: getDate(),
      curtidas: likes,
    }
    

    feedDatabase.child('/posts').push(newPost).then((snapshot) => postTemplate(getDate(), getText(), snapshot.key));
  
    
    // clearText();
  });

  /************************
  * funções em construção:
  *************************/

  // function clearText() {
  //   $('#comment-text').val('');
  // }

  $(document).on('click', '#delete-btn', function deletePost() {
    console.log('delete clicado');
    
    let del = document.getElementById('delete-btn');
    let valor = del.dataset.id;
    console.log(valor);
    

    firebase.database().ref('feed/posts/' + valor).remove().then(() => {
      $(this).parent('.post-card').remove();
      console.log('del');
      
    });
  })

  // $(document).on('click', '#delete-btn', function deletePost() {
  //   console.log('delete clicado');
    
  //   let del = document.getElementById('delete-btn');
  //   let valor = del.dataset.id;
  //   console.log(valor);
    

  //   firebase.database().ref('feed/posts/' + valor).remove().then(() => {
  //     $(this).parent('.post-card').remove();
  //     console.log('del');
      
  //   });
  // })

  // dataattribute
  // atualizar navegador


  /*****************************************
   * a funḉão abaixo não está dando 
   * console.log 
   * 
   * ************************************ */
  // $('#like-btn').click(function likePost(event) {
  //   event.preventDefault();
  //   console.log('foi');

  //   let countLikes = counter++;
  //   // for (let like in likes) {
  //   //   countLikes = like++;
  //   // }

  //    feedDatabase.child(id + '/curtidas').set(countLikes).then(counter.innerText = countLikes);
  // })

};

