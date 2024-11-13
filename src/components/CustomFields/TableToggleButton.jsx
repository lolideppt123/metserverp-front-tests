
function TableToggleButton({tableSize, setTableSize}) {
  return (
    <div className="d-flex justify-content-center align-items-center">
        <input 
            type='button' 
            className='btn btn-outline-primary btn-sm mt-4 d-flex justify-content-center align-items-center' 
            value={tableSize ? "Show all" : "Show less"} 
            onClick={() => {
                setTableSize(!tableSize);
            }}
        />
    </div>
  )
}

export default TableToggleButton