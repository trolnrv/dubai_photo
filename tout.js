let bouton = document.createElement('button');
bouton.innerText = 'Can you click me?';
bouton.addEventListener('click', () => {
	console.log('Oh, you clicked me!');
});
document.body.appendChild(bouton);
