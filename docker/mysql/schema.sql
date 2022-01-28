-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2022 at 03:38 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fermine`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_img` varchar(255) DEFAULT NULL,
  `post_content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_img`, `post_content`) VALUES
(1, './assets/presentationImage.svg', 'Depuis 1991, nos conseils recherchent et recrutent dans les domaines de la distribution, de l\'informatique, de l\'industrie et du textile. Par notre approche méthodologique et notre éthique, nous développons des relations fortes tant chez nos clients qu\'avec les candidats. Nous mettons nos candidats et nos clients sur un pied d\'égalité, par nos qualités d\'écoute et de sérieux, nous sommes à même de satisfaire les deux parties.'),
(2, './assets/methodologyImage.svg', 'Nous prenons connaissance de l\'entreprise: son histoire, sa vocation, son environnement, son marché, ses structures financière, économique et industrielle, ses objectifs et sa culture. Nous analysons la fonction à pourvoir : son historique, ses objectifs, la nature de l\'activité, les moyens mis à disposition (personnel, budget, méthodes, matériels), le contrôle, le système d\'appréciation et les limites de compétences, la place dans l\'organigramme, les liaisons hiérarchiques et fonctionnelles, les données spécifiques à prendre en compte, les conditions de rémunération. Nous définissons le profil recherché : les connaissances spécifiques, l\'expérience managériale, l\'origine sectorielle, la formation, les caractéristiques personnelles et intellectuelles. Nous favorisons l\'approche directe. Nous établissons le profil des candidats à un poste spécifique, en rapport aux exigences et besoins de nos clients. Nos consultants, formés et confirmés sont à même d\'intervenir efficacement pour le compte de chacun de nos clients en tant que pilote ou assistant.');

-- --------------------------------------------------------

--
-- Table structure for table `relation0`
--

CREATE TABLE `relation0` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX idx_unique_user_email ON users(user_email);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'echecsleo@gmail.com', 'shograti', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `relation0`
--
ALTER TABLE `relation0`
  ADD PRIMARY KEY (`post_id`,`user_id`),
  ADD KEY `relation0_users0_FK` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `relation0`
--
ALTER TABLE `relation0`
  ADD CONSTRAINT `relation0_posts_FK` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `relation0_users0_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
