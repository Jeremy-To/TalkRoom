import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function About() {
	return (
		<div className=" fixed bottom-0 w-full bg-gray-300 text-center p-2 flex items-center justify-between">
			<div className="italic ml-4 flex flex-col items-start">
				<p>ChatApp lets you chat with the world</p>
				<p>Made by Jérémy TO</p>
			</div>
			<ul className="flex px-8 list-none items-end gap-8 text-xl">
				<li>
					<a href="https://www.linkedin.com/in/jérémy-to/">
						<FaLinkedin />
					</a>
				</li>
				<li>
					<a href="https://github.com/Jeremy-To">
						<FaGithub />
					</a>
				</li>
			</ul>
		</div>
	);
}

export default About;
