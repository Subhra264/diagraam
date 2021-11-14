import './ComponentMetaEditor.scss';

export default function ComponentMetaEditor (props) {

    const changeTitle = evt => {
        props.setTitle(evt.target.value);
    }

    const changeDescription = evt => {
        props.setDescription(evt.target.value);
    }

    return (
        <div className="component-meta-editor">
        {
        (props.cellType)?(
            <div className="container">
                <div className="meta-title-container">
                    <h3 className="meta-title-header">Title</h3>
                    <input type='text' onChange={changeTitle} value={props.title}/>
                </div>
                <div className="meta-description-container">
                    <h3 className="meta-description-header">Description</h3>
                    <textarea onChange={changeDescription} value={props.description} />
                </div>
                { props.cellType==='element'? (
                    <div className='element-specific-attr'>
                    </div>
                ): (props.cellType==='link'? (
                    <div className='link-specific-attr'>
                    </div>
                ): !(props.cellType)? (
                    <div className='none-attr'>
                    </div>
                ): '')}
            </div>):''
        }
        </div>
    );
}