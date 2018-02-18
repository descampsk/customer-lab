import React from 'react';

export function dealWithLineBreak(text) {
	console.log(text);
	console.log(typeof text);
	if (typeof(text) == 'string') {
		var t = text.split('\n\n').map((it, id) => {
			return (
				<div key={id} style={{marginBottom: '25px'}} >
					{ 
						it.split('\n').map((i, id) => {
							return <p key={id}>{i}</p>
						})
					}
				</div>
			)
		});
	}
	return t;
}
