import { useState } from 'react';

export default function Search() {
  const [value, setValue] = useState('');
  const search = (e) => setValue(e.target.value);

  return (
    <div>
      <center>
        <h1 className="mt-5">Search Movie</h1>
        <form action="/results/" method='POST'>
          <input 
            type="search"
            className='form-control p-3' 
            value={value}
            onChange={search} 
            placeholder='Search'
          />
        </form>
      </center>
    </div>
  )
}