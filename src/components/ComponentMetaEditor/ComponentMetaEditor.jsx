import './ComponentMetaEditor.scss';

export default function ComponentMetaEditor(props) {
  const changeFieldValue = (ev, cellMetaDataKey, attrKeyField) => {
    props.setCellMetaData((oldCellMetaData) => {
      let oldCellMetaData_ = { ...oldCellMetaData };
      console.log('target.cellMetaDataKey', cellMetaDataKey);
      console.log('target.attrKeyField', attrKeyField);
      oldCellMetaData_[cellMetaDataKey][attrKeyField] = ev.target.value;

      return oldCellMetaData_;
    });
  };

  const changeCellSize = (ev, cellSizeField) => {
    props.setCellSize((oldCellSize) => {
      let oldCellSize_ = { ...oldCellSize };
      oldCellSize_[cellSizeField] = ev.target.value;

      return oldCellSize_;
    });
  };

  return (
    <div className="component-meta-editor">
      {props.cellType && props.cellType !== 'link' && (
        <div className="container">
          {props.cellSize && (
            <div className="cell-attr-group">
              <h3>Size</h3>
              <div className="underline"></div>
              <div className="cell-attr-group-fields">
                {Object.keys(props.cellSize).map((cellSizeField) => (
                  <div className="cell-attr-group-fields">
                    <div className="key-field-name">{cellSizeField}</div>
                    <input
                      type="number"
                      value={
                        props.cellSize[cellSizeField]
                          ? props.cellSize[cellSizeField]
                          : ''
                      }
                      onChange={(ev) => changeCellSize(ev, cellSizeField)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {Object.keys(props.cellMetaData).map((cellMetaDataKey) => (
            <div className="cell-attr-group" key={cellMetaDataKey}>
              <h3>{cellMetaDataKey}</h3>
              <div className="underline"></div>
              <div className="cell-attr-group-fields">
                {Object.keys(props.cellMetaData[cellMetaDataKey]).map(
                  (attrKeyField) => (
                    <div
                      className="cell-attr-key-field-group"
                      key={attrKeyField}
                    >
                      {!(
                        props.cellMetaData[cellMetaDataKey][
                          attrKeyField
                        ] instanceof Object
                      ) && (
                        <>
                          <div className="key-field-name">{attrKeyField}</div>
                          <input
                            type="text"
                            value={
                              props.cellMetaData[cellMetaDataKey][attrKeyField]
                                ? props.cellMetaData[cellMetaDataKey][
                                    attrKeyField
                                  ]
                                : ''
                            }
                            onChange={(ev) =>
                              changeFieldValue(
                                ev,
                                cellMetaDataKey,
                                attrKeyField,
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
