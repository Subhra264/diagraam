import './ComponentMetaEditor.scss';

export default function ComponentMetaEditor (props) {

    const changeFieldValue = (ev, cellMetaDataKey, attrKeyField) => {
        props.setCellMetaData(oldCellMetaData => {
            let oldCellMetaData_ = { ...oldCellMetaData };
            console.log('target.cellMetaDataKey', cellMetaDataKey);
            console.log('target.attrKeyField', attrKeyField);
            oldCellMetaData_[cellMetaDataKey][attrKeyField] = ev.target.value;
            
            return oldCellMetaData_;
        });
    };

    return (
        <div className="component-meta-editor">
        {
            props.cellType && (
                <div className="container">
                    {
                        Object.keys(props.cellMetaData).map(cellMetaDataKey => (
                            <div className="cell-attr-group">
                                <h3>{cellMetaDataKey}</h3>
                                <div className="cell-attr-group-fields">
                                    {
                                        Object.keys(props.cellMetaData[cellMetaDataKey]).map(attrKeyField => (
                                            <div className="cell-attr-key-field-group">
                                                <div className="key-field-name">{attrKeyField}</div>
                                                <input 
                                                    type='text' 
                                                    value={props.cellMetaData[cellMetaDataKey][attrKeyField]}
                                                    onChange={(ev) => changeFieldValue(ev, cellMetaDataKey, attrKeyField)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
        </div>
    );
}