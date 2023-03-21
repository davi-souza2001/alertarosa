import { answersListProps } from "../pages/questions/[categorie]";

export function renderMensage(list: answersListProps[]): string{
	const redQuestions: answersListProps[] = []
	const orangeQuestions: answersListProps[] = []
	const yellowQuestions: answersListProps[] = []

	list.map(question => {
		question.categorie === 'red' && redQuestions.push(question)
		question.categorie === 'yellow' && yellowQuestions.push(question)
		question.categorie === 'orange' && orangeQuestions.push(question)
	})

	console.log(redQuestions.length)
	console.log(orangeQuestions.length)
	console.log(yellowQuestions.length)

	if(redQuestions.length >= 2){
		return 'red'
	} else if(orangeQuestions.length >= 3){
		return 'orange'
	} else{
		return 'yellow'
	}
}
