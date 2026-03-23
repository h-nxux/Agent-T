export default function TextInput({ value, onChange, onAdd }) {
  const maxChar = 20;
  const isOver = value.length > maxChar;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isOver) {
      onAdd();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="할 일을 입력하세요"
      />
      
      <button
        onClick={onAdd}
        disabled={isOver || value === ''}
      >
        추가
      </button>

      <div>
        {value.length} / {maxChar}자
        {isOver && <span style={{ color: 'red', marginLeft: '10px' }}>20자 초과</span>}
      </div>
    </div>
  );
}
