import React from 'react';

function Footer() {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-300 text-center p-2 flex items-center justify-between">
			<div className="italic">
				<p>ChatApp lets you chat with the world</p>
				<p>Made by Jérémy TO</p>
			</div>
			<ul className="text-sm px-8 list-none flex items-end font-medium m-0 p-0 gap-10 ">
				<li className=" hover:text-blue-600 ">
					<a href="https://www.linkedin.com/in/jérémy-to/">
						Contact me via Linkedin
					</a>
				</li>
				<li className="text-sm hover:text-blue-600">
					<a href="https://github.com/Jeremy-To">Take a look at my work</a>
				</li>
			</ul>
		</div>
	);
}

export default Footer;
