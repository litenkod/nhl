
import React from 'react';
import './ErrorMsg.scss';

export class ErrorMsg extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            showModal: false
        }

    }

    componentDidUpdate(prevProps) {
        console.log('prevProps: ', prevProps);
        console.log('this.props.errorMsgArray: ', this.props.errorMsgArray);
        if(this.props.errorMsgArray.length !== 0){
            if (this.props.errorMsgArray !== prevProps.errorMsgArray) {
                console.log('update' );
                this.setState({
                    showModal: true
                })
            }

        }
    }

    componentDidMount () {
        console.log('this.props: ', this.props); 
    }

    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {

        const { errorMsgArray } = this.props;
        console.log('this.state.showModal: ', this.state.showModal);
        var errorContent = [];
        for (let i = 0; i < errorMsgArray.length; i++) {
            const title = errorMsgArray[i].title;
            const subTitle = errorMsgArray[i].subTitle;
            const text = errorMsgArray[i].text;

            errorContent.push(
                <div className="text-msg" key={i}>
                    <h3>{title}</h3>
                    <h4>{subTitle}</h4>
                    <p>{text}</p>

                    <button type="button" onClick={this.closeModal} className="btn-action -close">+</button>
                </div> 
            )
            
        }
        
        return (
            <div className={`error-msg ${this.state.showModal === false ? '-hidden' : ''}`}>
                {errorContent}
            </div>
        );
    }
}
