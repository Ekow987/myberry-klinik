import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle
} from "reactstrap"

export default function TrainingCard({
	image,
	title,
	text,
	data,
	subscribe,
	unsubscribe
}) {
	return (
		<Card id="cardChange">
			<CardImg alt="Card image cap" src={image} top width="100%" />
			<CardBody>
				<CardTitle tag="h5">{title}</CardTitle>
				<CardText>{text}</CardText>
				{data.comment ? (
					<div className="d-flex justify-content-between">
						<Button
							className="btn-sm btn-dark"
							id={data?.requestId}
						>
							subscribed
						</Button>
						<Button
							className="btn-sm btn-danger"
							id={data?.requestId}
							onClick={unsubscribe}
						>
							Delete
						</Button>
					</div>
				) : (
					<Button
						className="btn-sm btn-success"
						id={data?.code}
						onClick={subscribe}
					>
						Request
					</Button>
				)}
			</CardBody>
		</Card>
	)
}
