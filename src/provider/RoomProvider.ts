import { doc, setDoc } from "firebase/firestore"
import { ProviderRoomProps } from "../core/ProviderRoom"
import { PlayerProps, RoomProps } from "../core/Room"
import { db } from "../firebase/config"

export class RoomProvider implements ProviderRoomProps {

	async create(room: RoomProps): Promise<void> {
		await setDoc(doc(db, 'rooms', room.player.email), room)
	}
}
